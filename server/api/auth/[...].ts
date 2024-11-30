import Discord from "@auth/core/providers/discord"
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'identify email'
        }
      }
    })
  ],
  callbacks: {
    // 擴展 session 數據
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub
        session.user.accessToken = token.accessToken
      }
      return session
    },
    // 處理 JWT token
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  },
  // Cookie 設置
  cookies: {
    sessionToken: {
      name: 'SessionToken',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
})