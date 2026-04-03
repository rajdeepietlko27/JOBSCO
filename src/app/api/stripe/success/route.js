import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!sessionId) {
    return NextResponse.redirect(`${baseUrl}/membership?status=cancel`);
  }

  return NextResponse.redirect(
    `${baseUrl}/membership?status=success`
  );
}