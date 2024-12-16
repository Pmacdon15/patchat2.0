import ChatContainer from "@/components/ui/chat-container";
import { withAuth } from '@workos-inc/authkit-nextjs';
import SignInButtons from "@/components/ui/sign-in-sign-up-buttons/SignInButtons";
import SignOutButton from "@/components/ui/sign-out-button/SignOutButton";



export default async function Home() {
  const { user } = await withAuth();
  const username = user?.firstName + " " + user?.lastName || "Unknown";
  const profilePictureUrl = user?.profilePictureUrl || "/default-profile.jpg";
  return (
    <div className="grid grid-rows-[auto_1fr] bg-white shadow-[0px_3px_10px_1px_rgba(0,0,0,0.2)] m-[20px_auto] rounded-[10px] w-[calc(100%-40px)] max-w-[900px] overflow-hidden">
      <h1 className="bg-blue-500 mx-auto p-4 w-full text-4xl text-center">Pat Chat 2.0</h1>
      {user ? <SignOutButton /> : <SignInButtons />}
      <ChatContainer username={username} profilePictureUrl={profilePictureUrl} signedIn={!!user} />
      
    </div>
  )
}