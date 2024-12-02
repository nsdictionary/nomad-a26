import { getTweetDetail } from "./actions";

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await Promise.resolve(params);
  const tweetDetail = await getTweetDetail(id);
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 break-words">
        {tweetDetail.tweet}
      </h1>
      <div className="border-t pt-4 mt-4 text-gray-600">
        <p className="mb-2">
          <span className="font-semibold">작성자:</span>{" "}
          {tweetDetail.user.username}
        </p>
        <p>
          <span className="font-semibold">작성일:</span>{" "}
          {tweetDetail.createdAt.toLocaleDateString("ko-KR")}
        </p>
      </div>
    </div>
  );
}
