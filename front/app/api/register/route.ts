import bcrypt from 'bcrypt'
import { prisma } from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { type NextAuthOptions } from "next-auth";

export async function POST(request: Request) {
    const body = await request.json();
    const {name, email, password} = body;

    //Bcrypt usado apenas para o hashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);

    //Criando o usuario
    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
        },
    });
    return NextResponse.json(user);
}