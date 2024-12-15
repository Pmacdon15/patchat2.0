
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
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return <span key={index}  data-author={author}>{message.data}</span>;
  });

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div >
      <div >
        {messages}
        <div ref={messageEnd}></div>
      </div>
      <form onSubmit={handleFormSubmission} >
        <textarea
          ref={inputBox}
          value={messageText}
          placeholder="Type a message..."
          onChange={e => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <button type="submit"  disabled={messageTextIsEmpty}>Send</button>
      </form>
    </div>
  );
}
