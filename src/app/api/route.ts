import Ably from "ably";
// import { NextRequest } from "next/server";

// ensure Vercel doesn't cache the result of this route,
// as otherwise the token request data will eventually become outdated
// and we won't be able to authenticate on the client side


interface TokenRequestData {
    keyName: string;
    timestamp: number;
    nonce: string;
    mac: string;
}

export async function GET(): Promise<Response> {
    const client = new Ably.Rest(process.env.ABLY_API_KEY as string);
    const tokenRequestData: TokenRequestData = await client.auth.createTokenRequest({
        clientId: "ably-nextjs-demo",
    });
    return Response.json(tokenRequestData);
}