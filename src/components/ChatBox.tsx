"use client";
import React, { useEffect, useState, useRef, FormEvent, KeyboardEvent } from "react";
import { useChannel } from "ably/react";

interface Message {
    data?: { author: string; text: string };
    connectionId?: string;
}

export default function ChatBox() {
    const [messageText, setMessageText] = useState<string>("");
    const [receivedMessages, setMessages] = useState<Message[]>([]);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const { channel, ably } = useChannel("chat-demo", (message: Message) => {
        const history = receivedMessages.slice(-199);
        setMessages([
            ...history,
            {
                data: { author: message.data?.author || "unknown", text: message.data?.text || "" },
                connectionId: message.connectionId,
            },
        ]);
    });

    const inputBox = useRef<HTMLTextAreaElement>(null);
    const messageEnd = useRef<HTMLDivElement>(null);

    const sendChatMessage = (messageText: string) => {
        const message = { data: { author: "bob", text: messageText } };
        channel.publish(message); // Publish message to Ably
        setMessageText(""); // Clear the input box
        inputBox.current?.focus();
    };

    const handleFormSubmission = (event: FormEvent) => {
        event.preventDefault();
        if (!messageTextIsEmpty) {
            sendChatMessage(messageText);
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !messageTextIsEmpty) {
            sendChatMessage(messageText);
            event.preventDefault();
        }
    };

    const messages = receivedMessages.map((message, index) => (
        <div key={index} className="bg-blue-300 p-3 rounded-lg w-fit">
            <b>{message.data?.author}:</b> {message.data?.text}
        </div>
    ));

    useEffect(() => {
        messageEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [receivedMessages]);

    return (
        <div className="flex flex-col text-gray-500">
            <div className="flex flex-col gap-4 p-4">
                {messages}
                <div ref={messageEnd}></div>
            </div>
            <form className="flex mt-auto" onSubmit={handleFormSubmission}>
                <textarea
                    ref={inputBox}
                    value={messageText}
                    placeholder="Type a message..."
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="mb-0 p-2 border-t border-black rounded-sm w-[70%] md:w-[80%] h-20"
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-400 border-t border-black rounded-sm w-[30%] md:w-[20%] h-20"
                    disabled={messageTextIsEmpty}
                >
                    Send
                </button>
            </form>
        </div>
    );
}
