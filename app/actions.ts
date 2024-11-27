"use server";

import { z } from "zod";
import {
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

interface LoginResponse {
  email: FormDataEntryValue | null;
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  message?: string;
  errors?: Record<string, string[]>;
  loggedIn?: boolean;
}

export async function logIn(
  prevState: any,
  formData: FormData
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      ...data,
      loggedIn: false,
      errors: result.error.flatten().fieldErrors,
    };
  } else {
    return {
      ...data,
      loggedIn: true,
    };
  }
}

const formSchema = z.object({
  email: z.string().email().endsWith("@zod.com").toLowerCase(),
  username: z.string().min(USERNAME_MIN_LENGTH),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
