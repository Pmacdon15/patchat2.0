
'use client';
import React, { useEffect, useState, useRef, FormEvent, KeyboardEvent } from 'react';
import { useChannel } from 'ably/react';
// import styles from './ChatBox.module.css';

interface Message {
  data?: string;
  connectionId?: string;
}

export default function ChatBox() {
  const [messageText, setMessageText] = useState<string>("");
  const [receivedMessages, setMessages] = useState<Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { channel, ably } = useChannel("chat-demo", (message: Message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const inputBox = useRef<HTMLTextAreaElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);

  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.current?.focus();
  }

  const handleFormSubmission = (event: FormEvent) => {
    event.preventDefault();
    sendChatMessage(messageText);
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const messages = receivedMessages.map((message, index) => {
    // const author = message.connectionId === ably.connection.id ? "me" : "other";
    return <span key={index} className='bg-blue-300 p-3 rounded-lg w-fit' >{message.data}</span>;
  });

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className='flex flex-col text-gray-500' >
      <div className='flex flex-col gap-4 p-4' >
        {messages}
        <div ref={messageEnd}></div>
      </div>
      <form 
      className='flex mt-auto'
      onSubmit={handleFormSubmission} >
        <textarea
          ref={inputBox}
          value={messageText}
          placeholder="Type a message..."
          onChange={e => setMessageText(e.target.value)}
          onKeyDown={handleKeyPress}
          className='mb-0 p-2 border border-black rounded-md w-[90%] h-20'
        ></textarea>
        <button type="submit" className='bg-blue-400 border border-black rounded-sm w-[10%]' disabled={messageTextIsEmpty}>Send</button>
      </form>
    </div>
  );
}
