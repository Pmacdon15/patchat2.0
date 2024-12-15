'use client';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), {
    ssr: false,
})

export default function ChatContainer({ username, profilePictureUrl }: { username: string, profilePictureUrl: string }) {
    return (
        <div className="grid grid-rows-[auto_1fr] bg-white shadow-[0px_3px_10px_1px_rgba(0,0,0,0.2)] m-[20px_auto] rounded-[10px] w-[calc(100%-40px)] max-w-[900px] overflow-hidden">
            <h1 className="bg-blue-500 mx-auto p-4 w-full text-4xl text-center">Pat Chat 2.0</h1>
            <Chat username={username} profilePictureUrl={profilePictureUrl} />
        </div>
    );
};