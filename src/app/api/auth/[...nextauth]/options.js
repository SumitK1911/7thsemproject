import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);
        let userRole = "GitHub User";
        if (profile?.email == "sumit.kharbuja@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          name: profile.name || profile.login, // Ensure name is set
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);
        let userRole = "Google User";
        return {
          ...profile,
          name: profile.name || profile.email, // Ensure name is set
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email:", type: "text", placeholder: "your-email" },
        password: { label: "password:", type: "password", placeholder: "your-password" },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email }).lean().exec();
          if (foundUser) {
            const match = await bcrypt.compare(credentials.password, foundUser.password);
            if (match) {
              delete foundUser.password;
              foundUser["role"] = "Unverified Email";
              foundUser["name"] = foundUser.name || foundUser.email; // Ensure name is set
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name; // Ensure name is passed to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.name = token.name; // Ensure name is passed to the session
      }
      return session;
    },
  },
};
