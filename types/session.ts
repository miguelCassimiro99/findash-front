import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
