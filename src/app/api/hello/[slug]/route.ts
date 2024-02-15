import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const paramsGreeting = request.nextUrl.searchParams.get('greeting');
    const greeting = `${paramsGreeting || 'Hello'} ${slug}!!!`;
    const json = {
        greeting
    };

    return NextResponse.json(json);
}