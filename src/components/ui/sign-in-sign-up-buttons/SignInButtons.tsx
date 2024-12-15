import {
    getSignInUrl,
    getSignUpUrl,   
} from '@workos-inc/authkit-nextjs';
import Link from 'next/link';

export default async function SignInButtons() {
    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();
    return (
        <div className="flex justify-center items-center gap-2 p-2 text-blue-400 text-center">
            <Link href={signInUrl}>
            Sign In
            </Link>
            <Link href={signUpUrl}>
            Sign Up
            </Link>
        </div>
    );
};