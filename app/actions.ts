"use server";

interface LoginResponse {
  email: FormDataEntryValue | null;
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  message?: string;
  errors?: string[];
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

  if (data.password != "12345") {
    return {
      ...data,
      loggedIn: false,
      errors: ["Wrong password"],
    };
  }
  return {
    ...data,
    loggedIn: true,
  };
}
