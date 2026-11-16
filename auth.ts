import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { users } from "./db/schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, credentials.username as string),
        })

        if(!user || !user.passwordHash) {
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        )

        if (!isValid) {
          return null
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
   callbacks: {
    // 🧠 1. Fetch values from authorize() and pack them securely into the encrypted token
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
      }
      return token
    },
    // 🎨 2. Unpack values from the token and inject them straight into your live session context
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.userId // 🚀 Transports the missing user ID string onto the layout!
      }
      return session
    },
  }, 
  secret: process.env.NEXTAUTH_SECRET,
})