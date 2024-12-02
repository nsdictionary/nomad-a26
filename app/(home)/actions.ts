"use server";

import { TWEETS_PER_PAGE } from "@/lib/constants";
import db from "@/lib/db";

interface User {
  id: number;
  username: string;
}

export interface ITweet {
  id: number;
  tweet: string;
  createdAt: Date;
  user: User;
}

export async function getTweets(currentPage: number): Promise<ITweet[]> {
  const tweets = await db.tweet.findMany({
    skip: (currentPage - 1) * TWEETS_PER_PAGE,
    take: TWEETS_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return tweets;
}

export async function getTotalPages() {
  const totalTweets = await db.tweet.count();
  return Math.ceil(totalTweets / TWEETS_PER_PAGE);
}
