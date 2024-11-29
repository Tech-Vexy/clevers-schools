import { type ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import crypto from 'crypto';

export interface SessionData {
  _id: ObjectId;
  userId: string;
  sessionToken: string;
  userAgent: string;
  createdAt: Date;
  lastAccessedAt: Date;
}

export async function getActiveSessions(userId: string): Promise<SessionData[]> {
  const { db } = await connectToDatabase();
  return await db
    .collection<SessionData>("sessions")
    .find({ userId })
    .sort({ lastAccessedAt: -1 })
    .toArray();
}

export async function createSession(
  userId: string, 
  userAgent: string
): Promise<SessionData> {
  const { db } = await connectToDatabase();
  const sessionToken = crypto.randomBytes(32).toString('hex');
  
  const session: Omit<SessionData, '_id'> = {
    userId,
    sessionToken,
    userAgent,
    createdAt: new Date(),
    lastAccessedAt: new Date(),
  };
  
  const result = await db.collection<SessionData>("sessions").insertOne(session as SessionData);
  return { ...session, _id: result.insertedId };
}

export async function deleteSession(sessionToken: string): Promise<void> {
  const { db } = await connectToDatabase();
  await db.collection("sessions").deleteOne({ sessionToken });
}

export async function updateSessionActivity(sessionToken: string): Promise<void> {
  const { db } = await connectToDatabase();
  await db.collection("sessions").updateOne(
    { sessionToken },
    { $set: { lastAccessedAt: new Date() } }
  );
}