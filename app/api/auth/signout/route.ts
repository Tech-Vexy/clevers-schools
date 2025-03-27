import { NextResponse } from "next/server"

export async function POST() {
  // This route will handle sign-out requests
  return NextResponse.json({ success: true })
}

