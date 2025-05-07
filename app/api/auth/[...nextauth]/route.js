import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
          bio: profile.bio,
          html_url: profile.html_url,
          location: profile.location,
          followers: profile.followers,
          following: profile.following,
          public_repos: profile.public_repos,
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.sub;
        // Copy additional GitHub profile fields to the session
        if (token.login) session.user.login = token.login;
        if (token.bio) session.user.bio = token.bio;
        if (token.html_url) session.user.html_url = token.html_url;
        if (token.location) session.user.location = token.location;
        if (token.followers) session.user.followers = token.followers;
        if (token.following) session.user.following = token.following;
        if (token.public_repos) session.user.public_repos = token.public_repos;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Copy GitHub profile information to the JWT token
      if (user) {
        token.login = user.login;
        token.bio = user.bio;
        token.html_url = user.html_url;
        token.location = user.location;
        token.followers = user.followers;
        token.following = user.following;
        token.public_repos = user.public_repos;
      }
      return token;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
