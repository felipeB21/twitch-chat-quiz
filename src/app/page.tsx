"use client";
import Game from "@/components/game";
import Header from "@/components/header";
import LoginBtn from "@/components/login-btn";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <SessionProvider>
        <Header />
        <LoginBtn />
        <Game />
      </SessionProvider>
    </main>
  );
}
