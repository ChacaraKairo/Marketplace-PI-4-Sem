import NextAuth, { AuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/libs/prismadb";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from 'bcrypt';

//Configurando Prisma Auth para receber o usuario do banco
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        Credentials({
            credentials: {
                email: { 
                    label: 'email',
                    type: 'text',
                },
                password: {  
                    label: "password", 
                    type: "password",
                },
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password ){
                    throw new Error('Email ou senha inválidos')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user?.hashedPassword){
                    throw new Error('Email ou senha inválidos')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if(!isCorrectPassword){
                    throw new Error('Email ou senha inválidos')
                }
                return user
            }
        })
     ],
     pages: {
        signIn: '/login'
     },
     debug: process.env.NODE_ENV === 'development',
     session: {
        strategy: 'jwt'
     },
     secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);

