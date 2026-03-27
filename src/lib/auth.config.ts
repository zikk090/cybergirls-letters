import type { NextAuthConfig } from "next-auth";

// Auth config without Prisma — safe for Edge Runtime (middleware)
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isAdminPath =
        request.nextUrl.pathname.startsWith("/admin") &&
        !request.nextUrl.pathname.startsWith("/admin/login");
      if (isAdminPath) return !!auth?.user;
      return true;
    },
    session({ session, token }) {
      if (token?.sub) session.user.id = token.sub;
      return session;
    },
    jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
  providers: [], // Credentials provider added in auth.ts (requires Prisma/Node.js)
  session: { strategy: "jwt" },
};
