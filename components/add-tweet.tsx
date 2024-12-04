"use client";

import { createTweet } from "@/app/(home)/actions";
import { redirect } from "next/navigation";
import { useActionState, useState, useEffect } from "react";

export default function AddTweet() {
  const [tweet, setTweet] = useState("");
  const [state, formAction] = useActionState(createTweet, null);

  useEffect(() => {
    if (state?.success) {
      redirect(`/tweets/${state.tweetId}`);
    }
  }, [state]);

  const clientAction = async (formData: FormData) => {
    setTweet("");
    await formAction(formData);
  };

  return (
    <form action={clientAction} className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <textarea
          name="tweet"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="무슨 일이 일어나고 있나요?"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
          maxLength={280}
        />
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{tweet.length}/280</span>
        <button
          type="submit"
          disabled={tweet.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          트윗하기
        </button>
      </div>
    </form>
  );
}
