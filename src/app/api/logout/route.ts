import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const token = req.cookies.get("Authorization")?.value;

    
}