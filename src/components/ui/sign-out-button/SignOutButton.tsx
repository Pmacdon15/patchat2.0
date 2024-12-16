import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete('wos-session');
    redirect('/');
}

export default async function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
        >
            <button className='w-full text-blue-300 text-center hover:text-blue-500' type="submit">Sign Out</button>
        </form>
    );
};