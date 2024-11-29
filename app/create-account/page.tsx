"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { createAccount } from "./actions";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen">
      <div className="flex flex-col items-center mb-10 w-72 gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.errors?.username}
          defaultValue={state?.username?.toString() || ""}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.errors?.email}
          defaultValue={state?.email?.toString() || ""}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.errors?.password}
          defaultValue={state?.password?.toString() || ""}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.errors?.confirm_password}
          defaultValue={state?.confirm_password?.toString() || ""}
        />
        <Button text="Create account" />
      </form>
    </div>
  );
}
