import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI as string
const DB_NAME = process.env.MONGODB_DB || "pesapal_payments"

// MongoDB connection singleton
let client: MongoClient | null = null

export async function connectToDatabase() {
  if (client) {
    return { client, db: client.db(DB_NAME) }
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined")
  }

  client = new MongoClient(MONGODB_URI)
  await client.connect()

  return { client, db: client.db(DB_NAME) }
}

