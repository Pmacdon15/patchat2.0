'use client';

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import ChatBox from '@/components/ChatBox';

export default function Chat({ username, profilePictureUrl , signedIn}: { username: string, profilePictureUrl: string, signedIn: boolean  }) {
    const client = new Ably.Realtime({ authUrl: '/api' });

    return (
        <AblyProvider client={client}>
            <ChannelProvider channelName='chat-demo'>
                <ChatBox username={username} profilePictureUrl={profilePictureUrl} signedIn={signedIn}/>
            </ChannelProvider>
        </AblyProvider>
    );
}