"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Chat from "./chat";

export default function Game() {
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  if (status === "loading") return "";

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem("user-text", newText);
  };

  const isTextEmpty = text.trim() === "";

  const handleClose = () => {
    setShowOtherComponent(true);
  };

  return (
    <>
      {session ? (
        <div className="flex flex-col items-center gap-5 mt-40">
          {showOtherComponent ? (
            <Chat />
          ) : (
            <>
              <Link
                href="/how-to-play"
                className="text-yellow-200 hover:underline"
              >
                How to play?
              </Link>
              <div className="flex flex-col items-center gap-2">
                <input
                  onChange={handleText}
                  autoComplete="off"
                  className="bg-neutral-700 py-1 px-3 rounded w-[300px] text-white"
                  type="text"
                  name="insert-text"
                  placeholder="Insert text"
                />

                <button
                  onClick={handleClose}
                  className={`bg-green-600 py-1 px-5 rounded w-full text-center hover:bg-green-700 ${
                    isTextEmpty && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={isTextEmpty}
                >
                  Start
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mt-40">
          <p>Play with your chat</p>
        </div>
      )}
    </>
  );
}
