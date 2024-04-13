"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Twitch from "@/icons/Twitch";

export default function LoginBtn() {
  const { data: session, status } = useSession();

  if (status === "loading") return "Loading...";

  return (
    <div className="mt-10">
      {session ? (
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full w-auto h-auto"
            src={session.user?.image as string}
            alt={session.user?.name as string}
            width={50}
            height={50}
          />
          <div>
            <p className="text-medium">{session.user?.name}</p>

            <button
              className="text-yellow-400 font-medium"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-purple-600 text-white font-medium py-1 px-5 rounded flex items-center hover:bg-purple-700 duration-200"
          onClick={() => signIn("twitch")}
        >
          <div className="flex items-center gap-3">
            Sign in
            <Twitch />
          </div>
        </button>
      )}
    </div>
  );
}
