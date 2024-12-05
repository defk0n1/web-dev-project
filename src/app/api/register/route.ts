import { prisma } from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";


export async function POST(request: Request) {
    const result = await request.json()
    console.log(result.data)

    const {username , password , email} = result.data

    if (!username || !email || !password){
      return new NextResponse("Missing value",{ status: 400 })
    }

    const exist = await prisma.user.findUnique({
      where: {
        email:email

      }
    })

    if(exist){
      return new NextResponse("User already exists", { status : 400})
    } 

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    console.log(hash)

    const user = await prisma.user.create({
      data:{
        username,
        email,
        password:hash
      }
    })




    return NextResponse.json(user)
  }