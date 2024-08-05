import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
// import { error } from "console";

export async function POST(req:NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(null,{status:405})
  }

  try {
    // console.log(await req.json())
    const { email, name, password } = await req.json();
    console.log(name,email,password)
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      // return res.status(422).json({ error: "User already exists" });
      return new NextResponse(JSON.stringify({error:"User already exists"}),{status:422});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email:email,
        name:name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    // return res.status(200).json(user);
    return new NextResponse(JSON.stringify(user),{status:200});
  } catch (error) {
    console.log(error);
    // return res.status(400);
    return new NextResponse(null,{status:500})
  }
}
