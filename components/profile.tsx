"use client";

import BackButton from "@/app/components/back-button";
import { User } from "@prisma/client";
import { updateProfile } from "@/app/users/[username]/edit/actions";
import { useActionState, useOptimistic } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export type ProfileState = {
  success?: boolean;
  errors?: {
    username?: string[];
    password?: string[];
    email?: string[];
    bio?: string[];
    confirm_password?: string[];
  };
  updatedUser?: User;
  username: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  bio: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  confirm_password: FormDataEntryValue | null;
  id: FormDataEntryValue | null;
} | null;

export default function Profile({
  user,
  logOut,
  enableEdit = false,
}: {
  user: User;
  logOut: () => void;
  enableEdit: boolean;
}) {
  const [state, dispatch] = useActionState<ProfileState>(
    updateProfile,
    null
  ) as [ProfileState, (formData: FormData) => void, boolean];
  const [optimisticUser, setOptimisticUser] = useOptimistic(
    user,
    (state, formData: FormData) => ({
      ...state,
      username: formData.get("username")?.toString() || state.username,
      email: formData.get("email")?.toString() || state.email,
      bio: formData.get("bio")?.toString() || state.bio,
    })
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <BackButton />
      <h1 className="text-2xl font-bold my-6">Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button className="bg-red-500 text-white px-4 py-2 rounded mb-6">
          Log out
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">프로필 정보</h2>
        {state?.success && (
          <p className="text-green-500 mb-4">
            프로필이 성공적으로 업데이트되었습니다!
          </p>
        )}
        {enableEdit ? (
          <form
            action={(formData: FormData) => {
              setOptimisticUser(formData);
              dispatch(formData);
            }}
            className="flex flex-col gap-3"
          >
            <input type="hidden" name="id" value={optimisticUser.id} />
            <Input
              name="username"
              type="text"
              placeholder="사용자명"
              required
              errors={state?.errors?.username}
              defaultValue={optimisticUser.username}
            />
            <Input
              name="email"
              type="email"
              placeholder="이메일"
              required
              errors={state?.errors?.email}
              defaultValue={optimisticUser.email}
            />
            <Input
              name="bio"
              type="text"
              placeholder="자기소개"
              errors={state?.errors?.bio}
              defaultValue={optimisticUser.bio ?? ""}
            />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              minLength={PASSWORD_MIN_LENGTH}
              errors={state?.errors?.password}
              defaultValue={state?.password?.toString() || ""}
            />
            <Input
              name="confirm_password"
              type="password"
              placeholder="비밀번호 확인"
              minLength={PASSWORD_MIN_LENGTH}
              errors={state?.errors?.confirm_password}
              defaultValue={state?.confirm_password?.toString() || ""}
            />
            <Button text="저장하기" />
          </form>
        ) : (
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
        )}
      </div>
    </div>
  );
}
