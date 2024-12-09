import { getUserProfile, getUserTweets } from "./actions";
import { notFound } from "next/navigation";
import TweetCard from "@/components/tweet-card";
import BackButton from "@/app/components/back-button";

export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  const [profile, tweets] = await Promise.all([
    getUserProfile(username),
    getUserTweets(username),
  ]);

  if (!profile) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <p className="text-gray-600">@{profile.username}</p>
          {profile.bio && <p className="mt-2">{profile.bio}</p>}
          <p className="text-gray-600 text-sm mt-2">
            가입일: {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="border-b border-gray-300 mb-4" />
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
