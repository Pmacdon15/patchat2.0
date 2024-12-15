import Ably from "ably";

// ensure Vercel doesn't cache the result of this route,
// as otherwise the token request data will eventually become outdated
// and we won't be able to authenticate on the client side
export const revalidate = 0;

interface Request {
    method: string;
    url: string;
    headers: Headers;
    body?: any;
}

interface TokenRequestData {
    keyName: string;
    timestamp: number;
    nonce: string;
    mac: string;
}

export async function GET(request: Request): Promise<Response> {
    const client = new Ably.Rest(process.env.ABLY_API_KEY as string);
    const tokenRequestData: TokenRequestData = await client.auth.createTokenRequest({
        clientId: "ably-nextjs-demo",
    });
    return Response.json(tokenRequestData);
}