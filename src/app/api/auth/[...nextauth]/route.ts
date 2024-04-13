import NextAuth from "next-auth/next";
import Twitch from "next-auth/providers/twitch";

export const authOptions = {
  providers: [
    Twitch({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
