import { getTweetDetail, getUserName } from "./actions";
import Link from "next/link";
import ResponseList from "@/components/response-list";
import getSession from "@/lib/session";
import LikeButton from "@/components/like-buttion";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      userId_tweetId: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
}
export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await Promise.resolve(params);
  const revalidate = async () => {
    "use server";
    revalidatePath(`/tweets/${id}`);
  };
  const session = await getSession();
  if (!session || typeof session.id === "undefined") {
    return <div>로그인이 필요합니다</div>;
  }

  if (isNaN(Number(id))) {
    return notFound();
  }

  const tweetDetail = await getTweetDetail(id);
  const username = await getUserName(session.id);
  const { likeCount, isLiked } = await getCachedLikeStatus(Number(id));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4 *:text-blue-500">
          <Link href="/?page=1">← 목록으로 돌아가기</Link>
          <form action={revalidate}>
            <button type="submit">새로고침</button>
          </form>
        </div>
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
        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          tweetId={Number(id)}
        />
      </div>
      <div className="p-6 mt-8 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">답글</h2>
        <ResponseList tweetId={id} username={username!} />
      </div>
    </div>
  );
}
