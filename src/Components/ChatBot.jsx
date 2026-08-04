import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function ChatBot() {
    const [typing, setTyping] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const chatEndRef = useRef(null);
    const [chat, setChat] = useState([
        {
            sender: "bot",
            text: "Hi 👋 I am Smart Travel Assistant 🤖. How can I help you plan your trip?"
        }
    ]);


    const quickOptions = [
        "✈️ Plan My Trip",
        "🏨 Find Hotels",
        "💰 Budget Estimate",
        "🌤 Weather",
        "📍 Best Destinations"
    ];

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [chat, typing]);

    /*const getReply = (msg) => {
 
         let reply = "I can help you with destinations, hotels, budget and travel planning ✈️";
 
 
         if (msg.toLowerCase().includes("goa")) {
             reply = "Goa is amazing 🌊. Best time to visit is October to March.";
         }
 
         else if (msg.toLowerCase().includes("budget")) {
             reply = "Tell me destination, days and travelers. I will help calculate your trip budget 💰";
         }
 
         else if (msg.toLowerCase().includes("hotel")) {
             reply = "You can search hotels using our Hotel Finder module 🏨";
         }
 
         else if (msg.toLowerCase().includes("weather")) {
             reply = "You can check live weather from our Weather module 🌤️";
         }
 
         else if (msg.toLowerCase().includes("destination")) {
             reply = "Popular destinations: Goa 🌊, Manali 🏔️, Jaipur 🕌, Kerala 🌴 and Dubai 🌆";
         }
 
         else if (msg.toLowerCase().includes("plan")) {
             reply = "Sure! Tell me your destination, number of days and budget. I will create a travel plan ✈️";
         }
 
 
         return reply;
 
     }*/



    const sendMessage = async (text = message) => {
        if (text.trim() === "") return;

        // User message show
        setChat((prev) => [
            ...prev,
            {
                sender: "user",
                text: text,
            },
        ]);

        setMessage("");
        setTyping(true);
        console.log("Sending:", text);
        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: text,
                }),
            });
            console.log(response.status);
            const data = await response.json();
            console.log(data);
            setChat((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: data.reply,
                },
            ]);
        } catch (error) {
            setChat((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "❌ Sorry! AI is currently unavailable.",
                },
            ]);

            console.error(error);
        }

        setTyping(false);
    };








    return (
        <>


            {open && (

                <div className="chat-container">


                    <div className="chat-header">

                        <span>
                            🤖 Smart Travel Assistant
                        </span>

                        <button
                            className="close-chat"
                            onClick={() => setOpen(false)}
                        >
                            ❌
                        </button>

                    </div>



                    <div className="chat-body">


                        {
                            chat.map((c, index) => (


                                <div
                                    key={index}
                                    className={
                                        c.sender === "user"
                                            ? "user-message"
                                            : "bot-message"
                                    }
                                >
                                    {c.sender === "bot" ? (
                                        <ReactMarkdown>
                                            {c.text}
                                        </ReactMarkdown>
                                    ) : (
                                        c.text
                                    )}
                                </div>

                            ))
                        }

                        {
                            typing && (
                                <div className="bot-message typing-animation">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            )
                        }

                        <p style={{ fontSize: "13px", color: "#777" }}>
                            Quick help:
                        </p>


                        <div className="quick-buttons">

                            {
                                quickOptions.map((option, index) => (

                                    <button
                                        key={index}
                                        onClick={() => sendMessage(option)}
                                    >
                                        {option}
                                    </button>

                                ))
                            }

                        </div>

                        <div ref={chatEndRef}></div>

                    </div>



                    <div className="chat-input">


                        <textarea
                            placeholder="Ask about your trip..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                        />


                        <button className="send-button" onClick={() => sendMessage()}>
    Send
</button>


                    </div>


                </div>

            )}



            <div
                className="chat-button"
                onClick={() => setOpen(!open)}
            >
                🤖
            </div>


        </>
    );


}
export default ChatBot;