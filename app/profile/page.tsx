import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button className="bg-red-500 text-white px-4 py-2 rounded mb-6">
          Log out
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">프로필 정보</h2>
        <div className="space-y-3">
          <p>
            <span className="font-medium">이메일:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">가입일:</span>{" "}
            {user.createdAt.toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">자기소개:</span>{" "}
            {user.bio || "아직 작성된 자기소개가 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
}
