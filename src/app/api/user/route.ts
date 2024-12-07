// src/app/api/user/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

export async function GET() {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  return NextResponse.json(user) 
}