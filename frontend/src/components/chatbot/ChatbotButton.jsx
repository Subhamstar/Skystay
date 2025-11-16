import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <div className="chatbot-btn" onClick={() => setOpen(true)} role="button" aria-label="Open chat" title="Open chat">
          <span className="chatbot-badge" aria-hidden="true" />
          <span className="chatbot-label">Tani AI</span>

          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3C6.48 3 2 6.92 2 11.5c0 2.46 1.24 4.69 3.22 6.24L4 22l4.21-2.53c1 .29 2.07.46 3.19.46 5.52 0 10-3.92 10-8.5S17.52 3 12 3z"
              fill="#ffffff"
            />
          </svg>
        </div>
      )}

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
