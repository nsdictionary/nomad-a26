"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-neutral-200 text-black font-medium rounded-2xl text-center transition-colors h-10 disabled:bg-neutral-400 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
