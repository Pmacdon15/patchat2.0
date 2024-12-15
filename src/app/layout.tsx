import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SignOutButton from "@/components/ui/sign-out-button/SignOutButton";

import {
  withAuth,
  AuthKitProvider,
} from '@workos-inc/authkit-nextjs';
import SignInButtons from "@/components/ui/sign-in-sign-up-buttons/SignInButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pat Chat 2.0",
  description: "Pat Chat at 2.0 my second attempt at a real time chat application.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await withAuth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthKitProvider>
          <div className="grid grid-rows-[1fr_100px] bg-gray-200 min-h-screen">
            <div className="grid grid-rows-[auto_1fr] bg-white shadow-[0px_3px_10px_1px_rgba(0,0,0,0.2)] m-[20px_auto] rounded-[10px] w-[calc(100%-40px)] max-w-[900px] overflow-hidden">
              <h1 className="bg-blue-500 mx-auto p-4 w-full text-4xl text-center">Pat Chat 2.0</h1>
              {children}
            </div>

            {!user ?
              <SignInButtons />
              :
              <SignOutButton  />
            }
          </div>
        </AuthKitProvider>
      </body>
    </html>
  );
}


