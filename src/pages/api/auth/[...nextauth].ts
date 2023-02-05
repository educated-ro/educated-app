import NextAuth, { AuthOptions, Session } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import { JWT } from 'next-auth/jwt'
import axios from 'axios'
import { DefaultUser } from 'next-auth/core/types'

type SessionOutput = Session & {
  access_token: JWT
}
export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    session: async ({ session, token }): Promise<SessionOutput> => {
      return {
        ...session,
        access_token: token.jwt as JWT,
        user: {
          ...session.user,
          ...(typeof token.user === 'object' ? token.user : {}),
        },
      }
    },

    jwt: async ({ token, user, account }): Promise<JWT> => {
      if (!!user) {
        try {
          const response = await axios.get(`${process.env.API_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}&populate=deep`)
          const data = response.data

          const userRoleResponse = await axios.get(`${process.env.API_URL}/users/${data.user.id}?populate=*`)
          const role = userRoleResponse?.data?.role.name

          token.user = {
            ...data?.user,
            role,
          }
          token.jwt = data?.jwt
        } catch (e) {
          //TODO: Do something about errors
          console.log(e)
        }
      }
      return token
    },
  },
}

export default NextAuth(authOptions)
