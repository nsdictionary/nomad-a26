"use server";
import { ITweet } from "@/app/(home)/actions";
import db from "@/lib/db";

export async function getTweetDetail(id: string): Promise<ITweet> {
  const tweet = await db.tweet.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  if (!tweet) throw new Error("Tweet not found");

  return tweet;
}
