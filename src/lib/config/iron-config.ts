export const ironOptions = {
  cookieName: "APP_SESSION",
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    maxAge: undefined,
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};
