import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessage {
    id: number;
    message: string;
    sender: "recruiter" | "student";
    timestamp: string;
}

interface ChatProps {
    recruiterPhoto: string;
    studentPhoto: string;
    studentName: string;
    onClose: () => void;
}

export const Chat: React.FC<ChatProps> = ({
                                              recruiterPhoto,
                                              studentPhoto,
                                              studentName,
                                              onClose,
                                          }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [typingIndicator, setTypingIndicator] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typingIndicator]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const newChatMessage: ChatMessage = {
            id: messages.length + 1,
            message: newMessage,
            sender: "recruiter",
            timestamp: formatTime(new Date()),
        };

        setMessages((prevMessages) => [...prevMessages, newChatMessage]);
        setNewMessage("");

        setTypingIndicator(true);

        setTimeout(() => {
            setTypingIndicator(false);
            const automatedMessage: ChatMessage = {
                id: messages.length + 2,
                message: "This is an automated message for test purposes",
                sender: "student",
                timestamp: formatTime(new Date()),
            };
            setMessages((prevMessages) => [...prevMessages, automatedMessage]);
        }, 5000); // wait 5s
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-0 right-0 w-full md:w-[400px] h-[500px] bg-[#121212] border-2 border-[#1DB954] rounded-lg shadow-lg text-white z-50 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#282828] bg-[#181818] rounded-t-lg">
                <div className="flex items-center">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={studentPhoto} alt={`${studentName} photo`} />
                        <AvatarFallback>{studentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                        <h2 className="text-lg font-semibold text-white">{studentName}</h2>
                        <p className="text-sm text-gray-400">Chat</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-white transition"
                    aria-label="Close chat"
                >
                    ✕
                </button>
            </div>

            {/* Chat Messages */}
            <div
                className="flex-1 p-4 overflow-y-auto space-y-4"
                style={{
                    backgroundImage: `url('https://cdn.vectorstock.com/i/2000v/63/63/web-shopping-sale-background-seamless-pattern-vector-8116363.avif')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-end ${
                            msg.sender === "student" ? "justify-start" : "justify-end"
                        }`}
                    >
                        <Avatar className="w-8 h-8 mr-2">
                            <AvatarImage
                                src={msg.sender === "student" ? studentPhoto : recruiterPhoto}
                                alt={msg.sender === "student" ? "Student" : "Recruiter"}
                            />
                            <AvatarFallback>
                                {msg.sender === "student" ? studentName.charAt(0) : "R"}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            className={`p-3 rounded-xl max-w-xs ${
                                msg.sender === "student"
                                    ? "bg-[#404040] text-white"
                                    : "bg-[#1DB954] text-white"
                            } break-words`}
                        >
                            <p className="text-sm">{msg.message}</p>
                            <div className="text-xs text-[#E0E0E0] mt-1 text-right">
                                {msg.timestamp}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {typingIndicator && (
                    <div className="flex items-end justify-start">
                        <Avatar className="w-8 h-8 mr-2">
                            <AvatarImage src={studentPhoto} alt={`${studentName} photo`} />
                            <AvatarFallback>{studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-xl max-w-xs bg-[#404040] text-white break-words">
                            <p className="text-sm">...</p>
                        </div>
                    </div>
                )}

                {/* Reference for auto scroll */}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-[#181818] border-t border-[#282828] rounded-b-lg flex items-center space-x-2">
                <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 bg-[#282828] text-white border-[#1DB954] break-words"
                />
                <Button
                    onClick={handleSendMessage}
                    className="bg-[#1DB954] hover:bg-[#1ED760] text-white px-4"
                >
                    Send
                </Button>
            </div>
        </div>
    );
};
