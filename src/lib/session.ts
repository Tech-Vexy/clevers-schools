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
  expiresAt: Date;
}

const SESSION_EXPIRY_HOURS = 24; // Set expiry duration to 1 day

async function getDatabase() {
  const { db } = await connectToDatabase();
  return db;
}

export async function getActiveSessions(userId: string): Promise<SessionData[]> {
  const db = await getDatabase();
  const now = new Date();
  return await db
    .collection<SessionData>("sessions")
    .find({ userId, expiresAt: { $gte: now } }) // Check for non-expired sessions
    .sort({ lastAccessedAt: -1 })
    .toArray();
}

export async function createSession(userId: string, userAgent: string): Promise<SessionData> {
  const db = await getDatabase();
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000); // Calculate expiry date

  const session: Omit<SessionData, '_id'> = {
    userId,
    sessionToken,
    userAgent,
    createdAt: now,
    lastAccessedAt: now,
    expiresAt, // Set expiry date
  };

  const result = await db.collection<SessionData>("sessions").insertOne(session);
  return { ...session, _id: result.insertedId };
}

export async function deleteSession(sessionToken: string): Promise<void> {
  const db = await getDatabase();
  await db.collection("sessions").deleteOne({ sessionToken });
}

export async function updateSessionActivity(sessionToken: string): Promise<void> {
  const db = await getDatabase();
  await db.collection("sessions").updateOne(
    { sessionToken },
    { $set: { lastAccessedAt: new Date() } }
  );
}
