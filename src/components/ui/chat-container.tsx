'use client';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), {
    ssr: false,
})

export default function ChatContainer({ username, profilePictureUrl, signedIn }: { username: string, profilePictureUrl: string, signedIn: boolean }) {
    return (
        <>
            <Chat username={username} profilePictureUrl={profilePictureUrl} signedIn={signedIn} />
        </>
    );
};