
import { addUser } from "@/service/user";
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID || "",
    })
    // ...add more providers here
  ],
  callbacks : {
    async signIn({user : {id, name, email, image}}) {
      if(!email) {
        return false;
      }
      addUser({
        id,
        name : name || "",
        email,
        image,
        username : email.split("@")[0]
      });
      return true
    },
    async session({ session }){

      const user = session?.user;
      if(user){
        session.user = {
          ...user,
          username : user.email?.split('@')[0] || '',
        }
      }

      return session
    }
  },
  pages : {
    signIn : "/auth/signin",
  }
}
