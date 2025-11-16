import React, { useState, useEffect } from "react";
// import ChatbotLogoButton from "./ChatbotLogoButton";
import ChatWindow from "./ChatWindow";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [stage, setStage] = useState("idle");
  const [input, setInput] = useState("");

  const [booking, setBooking] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    place: "",
    mobile: "",
    numberOfGuests: 1,
    name: "",
    price: 0,
    token: ""
  });

  const addMessage = (text, sender = "bot") =>
    setMessages((prev) => [...prev, { text, sender }]);

  // Check login → your app stores JWT in localStorage
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((m) => [...m, { text: userText, sender: "user" }]);
    setInput("");

    const token = checkLogin();

    // 1. idle → login check
    if (stage === "idle") {
      if (!token) {
        addMessage("❌ You must login first to book rooms.");
        return;
      }
      setBooking((b) => ({ ...b, token }));
      addMessage("Which city do you want to book a room in?");
      setStage("askCity");
      return;
    }

    // 2. city
    if (stage === "askCity") {
      setBooking((b) => ({ ...b, city: userText }));
      addMessage("Enter check-in date (YYYY-MM-DD)");
      setStage("askCheckIn");
      return;
    }

    // 3. check-in
    if (stage === "askCheckIn") {
      setBooking((b) => ({ ...b, checkIn: userText }));
      addMessage("Enter check-out date (YYYY-MM-DD)");
      setStage("askCheckOut");
      return;
    }

    // 4. check-out → search rooms
    if (stage === "askCheckOut") {
      const data = { ...booking, checkOut: userText };
      setBooking(data);

      try {
        const res = await fetch("/api/places/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city: data.city,
            checkIn: data.checkIn,
            checkOut: userText
          })
        });

        const result = await res.json();

        if (!result.places || result.places.length === 0) {
          addMessage("No rooms available on those dates. Try another date.");
          setStage("askCity");
          return;
        }

        window.__places = result.places;

        const list = result.places
          .map((p, index) => `${index + 1}. ${p.title} - ₹${p.price}`)
          .join("\n");

        addMessage("Available rooms:\n" + list + "\nSelect a room number:");
        setStage("selectRoom");
      } catch (err) {
        addMessage("Server error while searching rooms.");
      }

      return;
    }

    // 5. choose room
    if (stage === "selectRoom") {
      const index = parseInt(userText) - 1;
      const places = window.__places;

      if (!places || !places[index]) {
        addMessage("Invalid choice. Select a valid room number.");
        return;
      }

      const selected = places[index];

      setBooking((b) => ({
        ...b,
        place: selected._id,
        price: selected.price
      }));

      addMessage(`Selected: ${selected.title}\nEnter your mobile number:`);
      setStage("askMobile");
      return;
    }

    // 6. mobile
    if (stage === "askMobile") {
      setBooking((b) => ({ ...b, mobile: userText }));
      addMessage("How many guests?");
      setStage("askGuests");
      return;
    }

    // 7. guests
    if (stage === "askGuests") {
      setBooking((b) => ({ ...b, numberOfGuests: userText }));
      addMessage("Enter your name:");
      setStage("askName");
      return;
    }

    // 8. name → create booking
    if (stage === "askName") {
      const updated = { ...booking, name: userText };
      setBooking(updated);

      addMessage("Creating your booking...");

      try {
        const res = await fetch("/api/booking/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated)
        });

        const result = await res.json();

        if (result.error) {
          addMessage("Booking failed: " + result.error);
          setStage("idle");
          return;
        }

        addMessage("🎉 Booking successful!");
        addMessage(`Booking ID: ${result._id}`);
        addMessage("Proceed to payment on your booking page.");

        setStage("idle");
      } catch (err) {
        addMessage("Server error. Try again later.");
        setStage("idle");
      }

      return;
    }
  };

  return (
    <>
      <ChatbotLogoButton onClick={() => setOpen(!open)} />
      <ChatWindow
        open={open}
        messages={messages}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </>
  );
}
