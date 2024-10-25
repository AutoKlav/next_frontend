import { IronSessionData } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      admin?: boolean;
    };
  }
}

export interface LoginData {
  username: string;
  password: string;
}
