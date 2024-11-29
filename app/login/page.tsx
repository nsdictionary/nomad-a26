"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { logIn } from "./actions";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { redirect } from "next/navigation";

export default function Login() {
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
            errors={state?.errors?.email}
            defaultValue={state?.email?.toString() || ""}
          />
          <Input
            name="username"
            type="text"
            placeholder="👤Username"
            required
            errors={state?.errors?.username}
            defaultValue={state?.username?.toString() || ""}
            // minLength={USERNAME_MIN_LENGTH}
          />
          <Input
            name="password"
            type="password"
            placeholder="🔑Password"
            required
            errors={state?.errors?.password}
            defaultValue={state?.password?.toString() || ""}
            // minLength={PASSWORD_MIN_LENGTH}
          />
          <Button text="Log in" />
        </form>
        <div className="flex flex-col mt-2 w-64">
          <Button
            text="Create account"
            onClick={() => redirect("/create-account")}
          />
        </div>
        {state?.loggedIn && (
          <div className="bg-green-400 w-64 h-12 rounded-xl flex items-center justify-center text-black mt-3">
            ✔ Welcome back!
          </div>
        )}
      </div>
    </div>
  );
}
