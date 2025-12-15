import ChatContainer from "@/components/ui/chat-container";
import { withAuth } from '@workos-inc/authkit-nextjs';
import SignInButtons from "@/components/ui/sign-in-sign-up-buttons/SignInButtons";
import SignOutButton from "@/components/ui/sign-out-button/SignOutButton";



export default async function Home() {
  const { user } = await withAuth();
  const username = user?.firstName + " " + user?.lastName || "Unknown";
  const profilePictureUrl = user?.profilePictureUrl || "/default-profile.jpg";
  return (
    <div className="flex flex-col bg-white shadow-[0px_3px_10px_1px_rgba(0,0,0,0.2)] m-[20px_auto] rounded-[10px] w-[calc(100%-40px)] max-w-[900px] overflow-hidden h-[calc(100vh-40px)]">
      <h1 className="bg-blue-500 mx-auto p-4 w-full text-4xl text-center text-white border-b shadow">Pat Chat 2.0</h1>
      {user ? <SignOutButton /> : <SignInButtons />}
      <div className="flex-1 min-h-0 w-full">
        <ChatContainer username={username} profilePictureUrl={profilePictureUrl} signedIn={!!user} />
      </div>
    </div>
  )
}