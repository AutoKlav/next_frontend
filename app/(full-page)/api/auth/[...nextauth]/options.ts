import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Korisnicko ime", type: "text" },
        password: { label: "Lozinka", type: "password" }
      },
      async authorize(credentials, req) {

        const users = [
          {
            id: '0',
            name: 'Grmi',
            email: 'grmi@grmi.com',
            password: 'grmi',
            role: 'grmi'
          },
          {
            id: '1',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin',
            role: 'admin'
          },
          {
            id: '2',
            name: 'User',
            email: 'korisnik@korisnik.com',
            password: 'korisnik',
            role: 'user'
          }];

        const user = users.find(user => user.email === credentials?.username && user.password === credentials?.password);

        if (credentials?.username === user?.email && credentials?.password === user?.password) {
          return user === undefined ? null : user;
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      return session
    },
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    //signIn: '/auth/login',
  }
}

