import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import {compare} from "bcrypt-ts";

import {prisma} from "../../../../lib/prisma";

import CredentialsProvider from "next-auth/providers/credentials";

export const options : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{ label: "Username", type: "text", placeholder: "username"},
                email:{ label: "Email", type: "text", placeholder: "email"},
                password:{ label :"Password" , type :"password" , placeholder: "password"},
                fullName:{ label :"Full Name" , type :"text" , placeholder: "full name"}

            },
            async authorize(credentials){
                const userCredentials = {
                    username: credentials?.username,
                    password: credentials?.password,
                    email: credentials?.email
                  };

                  const user = await prisma.user.findUnique({
                    where:{
                      email:credentials?.email
                    },
                  
                  })

                  if(!user){
                    return null;
                  }

                  const passwordsMatch = await compare(credentials?.password ,user.password)
                  if(!passwordsMatch){
                    return null;
                  }
               
                  return user;
             
                

            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
    
    // pages: {
    //     signIn: "/login",
    //     signOut: "/login",
    //     error: "/login",
    // },
    callbacks: {
        async session(session,token,user) {
            if (user !== null) {
              session.user = user
            }
            return await session;
        }, 
        async jwt({ token, user }) {
            return await token;
        },
// }
}
}