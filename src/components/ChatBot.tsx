"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: string[];
}

const botResponses: { [key: string]: { text: string; options?: string[] } } = {
  greeting: {
    text: "Hello! Welcome to MA Vision Developments. How can I assist you today?",
    options: ["Tell me about MA Vision", "View Projects", "Services offered", "Contact Sales"]
  },
  about: {
    text: "MA VISION Developments takes pride in being one of the few homegrown professional development firms in the UAE, established in 2001 and built on a foundation of excellence, trust, and vision. We specialize in project development, project management, cost consultancy, and strategic advisory services. Through our international network and strategic joint ventures, we provide clients with tools, insight, and resources needed to market and monetize mega developments.",
    options: ["View our projects", "Meet our leadership", "Contact us"]
  },
  projects: {
    text: "Since our inception, MA VISION has demonstrated consistent and remarkable growth—reflected in our expanding client base, diverse portfolio of high-impact projects, and the strength of our expert team. We work closely with VIP clients to develop, scale, and position their projects for long-term success.",
    options: ["Schedule a viewing", "Get project details", "Talk to sales team"]
  },
  services: {
    text: "Our services include:\n• Project Development\n• Project Management\n• Cost Consultancy\n• Strategic Advisory\n\nFrom concept to completion, we serve as a trusted partner and strategic advisor, offering deep sector expertise and end-to-end support.",
    options: ["Get a consultation", "Learn more", "Contact us"]
  },
  contact: {
    text: "I'd be happy to connect you with our team! Would you like to chat with us on WhatsApp for immediate assistance?",
    options: ["Yes, connect on WhatsApp", "Send an email", "Call us"]
  },
  whatsapp: {
    text: "Great! Click the button below to start a WhatsApp conversation with our team. They'll be happy to assist you with any inquiries.",
    options: ["Open WhatsApp"]
  },
  leadership: {
    text: "At the forefront of our leadership is Marwa, a seasoned expert and pioneer in the UAE's property development sector since 2001. Her experience spans the full project lifecycle—from site selection and feasibility analysis to financial modeling, acquisition, master planning, design management, and tendering. Over her career, she has led developments with a combined value exceeding AED 5 billion. She holds a degree in Architectural Engineering, is a certified PMP, and earned her Master's in Project Management from the American Academy, U.S.A.",
    options: ["View projects", "Contact us", "Learn more about MA Vision"]
  },
  default: {
    text: "Thank you for your interest! Would you like to speak with our team for more detailed information?",
    options: ["Yes, connect me", "Tell me about services", "View projects"]
  }
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const whatsappNumber = "971588665301";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage(botResponses.greeting.text, botResponses.greeting.options);
      }, 500);
    }
  };

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isBot: true,
        options
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: option,
      isBot: false
    }]);

    // Get bot response based on option
    setTimeout(() => {
      let response = botResponses.default;

      const optionLower = option.toLowerCase();

      if (optionLower.includes("about") || optionLower.includes("tell me")) {
        response = botResponses.about;
      } else if (optionLower.includes("project") || optionLower.includes("viewing")) {
        response = botResponses.projects;
      } else if (optionLower.includes("service") || optionLower.includes("consultation")) {
        response = botResponses.services;
      } else if (optionLower.includes("contact") || optionLower.includes("sales") || optionLower.includes("connect me")) {
        response = botResponses.contact;
      } else if (optionLower.includes("whatsapp")) {
        response = botResponses.whatsapp;
      } else if (optionLower.includes("leadership") || optionLower.includes("team")) {
        response = botResponses.leadership;
      } else if (optionLower.includes("open whatsapp")) {
        window.open(`https://wa.me/${whatsappNumber}?text=Hello! I'm interested in MA Vision developments.`, "_blank");
        response = { text: "Opening WhatsApp... Our team will respond shortly!", options: ["Ask another question", "Close chat"] };
      } else if (optionLower.includes("email")) {
        window.location.href = "mailto:info@mavdevelopments.com?subject=Inquiry from Website";
        response = { text: "Opening your email client... Feel free to ask more questions!", options: ["Ask another question", "Close chat"] };
      } else if (optionLower.includes("call")) {
        window.location.href = "tel:+971588665301";
        response = { text: "Initiating call... Our team is ready to assist you!", options: ["Ask another question", "Close chat"] };
      } else if (optionLower.includes("close")) {
        setIsOpen(false);
        return;
      }

      addBotMessage(response.text, response.options);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: inputValue,
      isBot: false
    }]);

    const userInput = inputValue.toLowerCase();
    setInputValue("");

    // Simple keyword matching
    setTimeout(() => {
      let response = botResponses.default;

      if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
        response = botResponses.greeting;
      } else if (userInput.includes("about") || userInput.includes("company") || userInput.includes("who")) {
        response = botResponses.about;
      } else if (userInput.includes("project") || userInput.includes("building") || userInput.includes("development")) {
        response = botResponses.projects;
      } else if (userInput.includes("service") || userInput.includes("offer") || userInput.includes("do you")) {
        response = botResponses.services;
      } else if (userInput.includes("contact") || userInput.includes("reach") || userInput.includes("talk") || userInput.includes("speak")) {
        response = botResponses.contact;
      } else if (userInput.includes("whatsapp") || userInput.includes("chat")) {
        response = botResponses.whatsapp;
      } else if (userInput.includes("leader") || userInput.includes("ceo") || userInput.includes("founder") || userInput.includes("marwa")) {
        response = botResponses.leadership;
      } else if (userInput.includes("price") || userInput.includes("cost") || userInput.includes("invest")) {
        response = {
          text: "For pricing and investment inquiries, I recommend speaking directly with our sales team who can provide detailed information tailored to your needs.",
          options: ["Connect on WhatsApp", "Send an email", "Call us"]
        };
      }

      addBotMessage(response.text, response.options);
    }, 300);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className={`chatbot-btn ${isOpen ? 'active' : ''}`}
        onClick={() => isOpen ? setIsOpen(false) : openChat()}
        aria-label="Chat with us"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 11.5C21 16.75 16.75 21 11.5 21C9.81 21 8.21 20.58 6.8 19.82L3 21L4.18 17.2C3.42 15.79 3 14.19 3 12.5C3 7.25 7.25 3 12.5 3C17.75 3 22 7.25 22 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12H8.01M12 12H12.01M16 12H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
        <span className="chatbot-btn-text">Chat</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <span>MA</span>
              </div>
              <div>
                <h4>MA Vision Support</h4>
                <span className="chatbot-status">Online</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg ${msg.isBot ? 'bot' : 'user'}`}>
                <p>{msg.text}</p>
                {msg.options && msg.isBot && (
                  <div className="chatbot-options">
                    {msg.options.map((option, idx) => (
                      <button
                        key={idx}
                        className="chatbot-option-btn"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-msg bot">
                <div className="chatbot-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
