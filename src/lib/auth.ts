import { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions={
    pages:{
        signIn:"/login"
    },
    session:{
        strategy:"jwt"
    },
    secret
}