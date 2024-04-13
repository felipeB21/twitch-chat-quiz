"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getAccessToken } from "@/lib/authToken";

export default function Chat() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const getChat = async () => {
      if (status === "authenticated" && session) {
        const accessToken = await getAccessToken();

        const response = await fetch(
          `https://api.twitch.tv/helix/users?login=${session.user?.name}`,
          {
            method: "GET",
            headers: {
              "Client-ID": process.env.TWITCH_CLIENT_ID as string,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const userData = await response.json();
        if (userData.data) {
          const userId = userData.data[0].id;
          const chatResponse = await fetch(
            `https://api.twitch.tv/helix/chat/chatters?broadcaster_id=${userId}`,
            {
              headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID as string,
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const chatData = await chatResponse.json();
          console.log("Chat data:", chatData);
        }
      }
    };

    getChat();
  }, [session, status]);
  return <div></div>;
}
