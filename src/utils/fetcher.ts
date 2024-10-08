import { LoginData } from "@/interfaces/auth";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export const login = async (loginData: LoginData) => {
  const req = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  return req.status === 200;
};

export const logout = async () => {
  const req = await fetch("/api/logout", {
    method: "POST",
  });

  return req.status === 200;
};
