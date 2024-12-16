# Pat Chat 2.0

<img alt="Next JS" src="https://ziadoua.github.io/m3-Markdown-Badges/badges/NextJS/nextjs2.svg"/> <img alt="Vercel" src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Vercel/vercel2.svg"/> <img alt="TypeScript" src="https://ziadoua.github.io/m3-Markdown-Badges/badges/TypeScript/typescript2.svg"/> <img alt="tailwind" src="https://ziadoua.github.io/m3-Markdown-Badges/badges/TailwindCSS/tailwindcss2.svg">

## Description 
<i>Pat Chat 2.0</i> is a real time chat application created with <i>Ably</i>, coded with TypeScript, hosted on <i>Vercel</i>, styled with<i>Tailwind</i>, with authentication provided by <i>Workos's Auth kit.</i> I wanted to create a real time chat app with <i>NextJs</i>, after doing some googling and reading I decided to go with <i>Ably</i>. The process was smooth although I wish the free tier was more generous before it started giving out warnings(lol).

## Setup
1. ``` npm i ```
2. Create an account at [ably.com](https://www.ably.com)
3. Create an account at [authkit.com](https://www.authkit.com/)
>Note Remember to configure NEXT_PUBLIC_WORKOS_REDIRECT_URI="http://localhost:3000/api/callback" in the WorkOS dashboard
4. Create an .env:
```env
WORKOS_API_KEY='<Your WorkOS API Key>'
WORKOS_CLIENT_ID='<Your WorkOS Client ID>'
WORKOS_COOKIE_PASSWORD="<Your secure password here>" # generate a secure password here

# configured in the WorkOS dashboard
NEXT_PUBLIC_WORKOS_REDIRECT_URI="http://localhost:3000/api/callback"


ABLY_API_KEY="<Your Ably API Key>"
```
5. Run ``` npm run build ```
6. Then ``` npm start ```

## Usage 
Go to [http://localhost:3000/](http://localhost:3000/)(after following setup) or [https://www.patchat.ca](https://www.patchat.ca) then sign in to begin chatting.

## Features
### Current
- Real time messaging
- User profile image shown on chat bubble 
- User name shown on chat bubble
- 2 min chat history
### Coming soon
- Longer chat history
- Theme color change
- User direct message

