import ChatContainer from "@/components/ui/chat-container";
import { withAuth } from '@workos-inc/authkit-nextjs';



export default async function Home() {
  const { user } = await withAuth({ ensureSignedIn: true });
  const username = user.firstName + " " + user.lastName;
  const profilePictureUrl = user.profilePictureUrl;
  return (
    <ChatContainer username={username} profilePictureUrl={profilePictureUrl || "/default-profile.jpeg"} />
  )
}