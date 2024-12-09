"use client";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { useTransition } from "react";
import { dislikeTweet, likeTweet } from "@/app/tweets/[id]/actions";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    startTransition(() => {
      reducerFn(undefined);
    });
    if (state.isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 mt-2  transition-colors ${
        state.isLiked ? "bg-blue-300 text-white" : "hover:bg-blue-300"
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-5" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      {state.isLiked ? (
        <span> {state.likeCount}</span>
      ) : (
        <span>좋아요 ({state.likeCount})</span>
      )}
    </button>
  );
}
