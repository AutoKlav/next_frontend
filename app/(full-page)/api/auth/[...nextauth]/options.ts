import { NextAuthOptions  } from "next-auth"
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
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
              
            const users = [
              {
                id: '1',
                name: 'Admin',
                email: 'admin@admin.com',
                password: 'admin',
                role:'admin'
            },
            {
                id: '2',
                name: 'User',
                email: 'korisnik@korisnik.com',
                password: 'korisnik',
                role:'user'
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
      pages: {
        //signIn: '/auth/login',
      }
}

