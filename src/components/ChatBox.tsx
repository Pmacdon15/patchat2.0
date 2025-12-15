"use client";
import { useEffect, useState, useRef, FormEvent, KeyboardEvent } from "react";
import { useChannel } from "ably/react";
import Image from "next/image";

interface Message {
    data?: { profilePictureUrl: string, author: string; text: string };
    connectionId?: string;
}

export default function ChatBox({ username, profilePictureUrl, signedIn }: { username: string, profilePictureUrl: string, signedIn: boolean }) {
    const [messageText, setMessageText] = useState<string>("");
    const [receivedMessages, setMessages] = useState<Message[]>([]);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const { channel } = useChannel("chat-demo", (message) => {
        const history = receivedMessages.slice(-199);
        setMessages([
            ...history,
            {
                data: { profilePictureUrl: message.data?.profilePictureUrl || "/default-profile.jpg", author: message.data?.author || "unknown", text: message.data?.text || "" },
                connectionId: message.connectionId,
            },
        ]);
    });

    const inputBox = useRef<HTMLTextAreaElement>(null);
    const messageEnd = useRef<HTMLDivElement>(null);

    const sendChatMessage = (messageText: string) => {
        if (!signedIn) return;
        const message = { data: { profilePictureUrl: profilePictureUrl, author: username, text: messageText } };
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
    const messages = receivedMessages.map((message, index) => {
        const isMe = message.data?.author === username;
        return (
            <div key={index} className={`flex gap-4 p-3 rounded-lg w-fit max-w-[80%] break-words ${isMe ? "bg-blue-500 text-white self-end rounded-br-none" : "bg-gray-200 text-gray-800 self-start rounded-bl-none"}`}>
                {!isMe && (
                    <Image
                        alt="Profile Image"
                        src={message.data?.profilePictureUrl || "/default-profile.jpg"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10"
                    />
                )}
                <div className="flex flex-col">
                    <span className="font-bold text-xs opacity-80 mb-1">{message.data?.author}</span>
                    <span>{message.data?.text}</span>
                </div>
                {isMe && (
                     <Image
                     alt="Profile Image"
                     src={message.data?.profilePictureUrl || "/default-profile.jpg"}
                     width={40}
                     height={40}
                     className="rounded-full object-cover w-10 h-10"
                 />
                )}
            </div>
        );
    });

    useEffect(() => {
        messageEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [receivedMessages]);

    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const historicalMessages = await channel.history({
              direction: 'forwards',
              limit: 50
            });
            setMessages(historicalMessages.items);
          } catch (error) {
            console.error('Error fetching message history:', error);
          }
        };
        fetchMessages();
      }, [channel]);

    return (
        <div className="flex flex-col h-full text-gray-500">
            <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-auto  ">
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
                    className="mb-0 p-2 border-t focus:border-t border-black rounded-sm w-[70%] md:w-[80%] h-20 overflow-auto focus:outline-none bg-white text-black"
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-500 border-t border-black rounded-sm w-[30%] md:w-[20%] h-20 hover:text-white"
                    disabled={messageTextIsEmpty || !signedIn}
                >
                    Send
                </button>
            </form>
        </div>
    );
}
