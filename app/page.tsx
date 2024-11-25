"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { logIn } from "./actions";

export default function Home() {
  const [state, dispatch] = useActionState(logIn, null);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen">
        <div className="text-6xl mb-10">🔥</div>
        <form action={dispatch} className="flex flex-col gap-3 w-64">
          <Input
            name="email"
            type="email"
            placeholder="✉️Email"
            required
            defaultValue={state?.email?.toString() || ""}
          />
          <Input
            name="username"
            type="text"
            placeholder="👤Username"
            required
            defaultValue={state?.username?.toString() || ""}
          />
          <Input
            name="password"
            type="password"
            placeholder="🔑Password"
            required
            errors={state?.errors}
            defaultValue={state?.password?.toString() || ""}
          />
          <Button text="Log in" />
        </form>
        {state?.loggedIn && (
          <div className="bg-green-400 w-64 h-12 rounded-xl flex items-center justify-center text-black mt-3">
            ✔ Welcome back!
          </div>
        )}
      </div>
    </div>
  );
}
