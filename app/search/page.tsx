"use client";

import { useState } from "react";
import { searchTweets } from "./actions";
import TweetCard from "@/components/tweet-card";
import Input from "@/components/input";
import { ITweet } from "../(home)/actions";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await searchTweets(query);
    if (results.error) {
      setError(results.error);
      setTweets([]);
    } else if (results.tweets) {
      setTweets(results.tweets);
      setError(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto pt-4 space-y-4">
      <form onSubmit={handleSearch} className="flex justify-center">
        <div className="flex gap-2">
          <Input
            name="query"
            placeholder="트윗 검색하기..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-300 rounded-3xl text-white"
          >
            검색
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 text-red-500 bg-red-100 rounded-lg">{error}</div>
      )}

      <div className="space-y-4">
        {error == null && tweets.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            검색 결과가 없습니다.
          </div>
        ) : (
          tweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)
        )}
      </div>
    </div>
  );
}
