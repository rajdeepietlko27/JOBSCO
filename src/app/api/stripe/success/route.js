import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/membership?status=cancel", req.url));
  }

  return NextResponse.redirect(
    new URL("/membership?status=success", req.url)
  );
}