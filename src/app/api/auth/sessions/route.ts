import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { deleteSession, getActiveSessions } from "@/lib/session";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const activeSessions = await getActiveSessions(session.user.id);
  return NextResponse.json(activeSessions);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionToken } = (await req.json()) as { sessionToken: string };
  await deleteSession(sessionToken);
  return NextResponse.json({ success: true });
}