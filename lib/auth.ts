import { connectToDatabase } from "@/lib/db"
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb"

export async function createUser({ name, email, password }: { name: string; email: string; password: string }) {
  const { db } = await connectToDatabase()

  // Check if user already exists
  const existingUser = await db.collection("users").findOne({ email })
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create the user
  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  })

  return {
    id: result.insertedId.toString(),
    name,
    email,
  }
}

export async function getUserById(id: string) {
  const { db } = await connectToDatabase()

  const user = await db.collection("users").findOne({ _id: new ObjectId(id) })

  if (!user) {
    return null
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  }
}

