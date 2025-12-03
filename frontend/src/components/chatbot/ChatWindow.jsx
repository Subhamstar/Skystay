import React, { useState, useContext } from "react";
import "./chatbot.css";
import userContext from "../../Context/Usercontext";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I can help you book a room. Are you logged in?" }
  ]);

  const [step, setStep] = useState("checkLogin");
  const [input, setInput] = useState("");

  const ctx = useContext(userContext);
  const ctxUser = ctx?.user;

  const bookingData = {
    city: "",
    checkIn: "",
    checkOut: "",
    roomId: "",
    token: "",
    userName: "",
  };

  const pushMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleUserResponse = async () => {
    if (!input.trim()) return;
    pushMessage("user", input);

    // ---------------------- STEP 1: CHECK LOGIN ----------------------
    if (step === "checkLogin") {
      const localUser = JSON.parse(localStorage.getItem("userInfo") || "null");
      const token = ctxUser?.token || localUser?.token || localStorage.getItem("token");
    // make Enter send the message (install once)
    if (!window.__chat_enter_handler_installed) {
        window.__chat_enter_handler_installed = true;
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const active = document.activeElement;
                if (active && active.closest && active.closest(".chat-input-area")) {
                    e.preventDefault();
                    const sendBtn = document.querySelector(".chat-input-area button");
                    if (sendBtn) sendBtn.click();
                }
            }
        });
    }
    const chatWindow = document.querySelector(".chat-window");
    const chatBody = document.querySelector(".chat-body");
    const chatInputArea = document.querySelector(".chat-input-area");

    if (chatWindow) {
      chatWindow.style.display = "flex";
      chatWindow.style.flexDirection = "column";
    }

    if (chatBody) {
        chatBody.style.flex = "1 1 auto";
        chatBody.style.overflowY = "auto";
        chatBody.style.webkitOverflowScrolling = "touch";
        // ensure new messages auto-scroll to bottom
        if (!chatBody.__autoScrollObserver) {
            const obs = new MutationObserver(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            });
            obs.observe(chatBody, { childList: true, subtree: true });
            chatBody.__autoScrollObserver = obs;
        }
        // scroll now in case there are existing messages
        setTimeout(() => (chatBody.scrollTop = chatBody.scrollHeight), 0);
    }

    if (chatInputArea) {
        chatInputArea.style.flex = "0 0 auto";
        chatInputArea.style.borderTop = chatInputArea.style.borderTop || "1px solid #eee";
    }
      if (!token) {
        pushMessage("bot", "You are not logged in. Please login first (go to /login).");
        setInput("");
        return;
      }

      // Prefer the user object from context/local storage rather than always re-checking
      const userObj = ctxUser || JSON.parse(localStorage.getItem("userInfo") || "null");
      bookingData.token = token;
      bookingData.userName = userObj?.name || "";

      pushMessage("bot", "Great! Please enter the city you want to book in.");
      setStep("city");
      setInput("");
      return;
    }

    // ---------------------- STEP 2: CITY ----------------------
    if (step === "city") {
      bookingData.city = input.trim();

      pushMessage("bot", "Enter check-in date (YYYY-MM-DD):");
      setStep("checkIn");
      setInput("");
      return;
    }

    // ---------------------- STEP 3: CHECK-IN ---------------------
    if (step === "checkIn") {
      bookingData.checkIn = input.trim();
      pushMessage("bot", "Enter check-out date (YYYY-MM-DD):");
      setStep("checkOut");
      setInput("");
      return;
    }

    // ---------------------- STEP 4: CHECK-OUT ----------------------
    if (step === "checkOut") {
      bookingData.checkOut = input.trim();

      pushMessage("bot", "Searching rooms...");
      setInput("");

      const roomsRes = await fetch(
        `/api/search?city=${encodeURIComponent(bookingData.city)}&checkIn=${encodeURIComponent(
          bookingData.checkIn
        )}&checkOut=${encodeURIComponent(bookingData.checkOut)}`
      );

      const rooms = await roomsRes.json();

      if (!rooms.length) {
        pushMessage("bot", "No rooms available in this city.");
        return;
      }

      pushMessage(
        "bot",
        `Here are available rooms:\n` +
          rooms.map((r, i) => `${i + 1}. ${r.title} - ₹${r.price}`).join("\n") +
          "\n\nEnter room number to book:"
      );

      bookingData.availableRooms = rooms;
      setStep("selectRoom");
      return;
    }

    // ---------------------- STEP 5: SELECT ROOM ----------------------
    if (step === "selectRoom") {
      const idx = parseInt(input.trim()) - 1;
      const room = bookingData.availableRooms[idx];

      if (!room) {
        pushMessage("bot", "Invalid choice. Try again.");
        setInput("");
        return;
      }

      bookingData.roomId = room._id;
      bookingData.price = room.price;

      pushMessage("bot", "Enter your mobile number:");
      setStep("mobile");
      setInput("");
      return;
    }

    // ---------------------- STEP 6: MOBILE NUMBER ----------------------
    if (step === "mobile") {
      bookingData.mobile = input.trim();
      pushMessage("bot", "Enter number of guests:");
      setStep("guests");
      setInput("");
      return;
    }

    // ---------------------- STEP 7: GUESTS ----------------------
    if (step === "guests") {
      bookingData.numberOfGuests = Number(input.trim());

      // Send booking to backend
      pushMessage("bot", "Processing booking...");

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          place: bookingData.roomId,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          mobile: bookingData.mobile,
          numberOfGuests: bookingData.numberOfGuests,
          name: bookingData.userName,
          price: bookingData.price,
          token: bookingData.token
        }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        pushMessage("bot", "Booking failed: " + data.error);
        return;
      }

      pushMessage("bot", "🎉 Booking successful!");
      pushMessage("bot", `Your booking ID: ${data._id}`);
      setStep("done");
    }

    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        Chatbot
        <span className="close-btn" role="button" aria-label="Close chat" onClick={onClose}>×</span>
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
        />
        <button onClick={handleUserResponse}>Send</button>
      </div>
    </div>
  );
}
