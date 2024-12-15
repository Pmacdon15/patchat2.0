'use client';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), {
    ssr: false,
})

export default function ChatContainer({ username, profilePictureUrl }: { username: string, profilePictureUrl: string }) {
    return (
        <>            
            <Chat username={username} profilePictureUrl={profilePictureUrl} />
        </>
    );
};