'use client';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_100px] min-h-screen bg-gray-200">
      <div className="grid grid-rows-[auto_1fr] w-[calc(100%-40px)] max-w-[900px] m-[20px_auto] rounded-[10px] overflow-hidden shadow-[0px_3px_10px_1px_rgba(0,0,0,0.2)] bg-white">
        <h1 className="bg-blue-500 p-4 text-center text-4xl mx-auto w-full">Pat Chat 2.0</h1>
        <Chat />
      </div>
    </div>
  )
}