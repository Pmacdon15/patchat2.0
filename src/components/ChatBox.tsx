"use client";
import React, { useEffect, useState, useRef, FormEvent, KeyboardEvent } from "react";
import { useChannel } from "ably/react";
import Image from "next/image";

interface Message {
    data?: { author: string; text: string };
    connectionId?: string;
}

export default function ChatBox({ username, profilePictureUrl }: { username: string, profilePictureUrl: string }) {
    const [messageText, setMessageText] = useState<string>("");
    const [receivedMessages, setMessages] = useState<Message[]>([]);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const { channel } = useChannel("chat-demo", (message: Message) => {
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
        const message = { data: { author: username || "unknown user", text: messageText } };
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
        <div key={index} className="flex gap-4 bg-blue-300 p-3 rounded-lg w-fit max-w-full break-words">
            <Image
                alt="Profile Image"
                src={ profilePictureUrl || "/default-profile.jpeg" }
                width={50}
                height={50}
                className="rounded-full object-cover"
            />
            <div className="flex flex-col">
                <b>{message.data?.author}:</b>
                <span>{message.data?.text}</span>
            </div>
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
                    className="mb-0 p-2 border-t border-black focus:border-b-0 rounded-sm w-[70%] md:w-[80%] h-20 focus:outline-none"
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-500 border-t border-black rounded-sm w-[30%] md:w-[20%] h-20 hover:text-white"
                    disabled={messageTextIsEmpty}
                >
                    Send
                </button>
            </form>
        </div>
    );
}
