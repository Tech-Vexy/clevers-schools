import { MongoClient, Db, AuthMechanism } from 'mongodb';

// Check for required environment variables
if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable');
}

if (!process.env.MONGODB_USER || !process.env.MONGODB_PASSWORD) {
    throw new Error('Missing MongoDB credentials in environment variables');
}

// Database Configuration
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD);
const MONGODB_HOST = process.env.MONGODB_HOST || 'cluster0.mongodb.net';
const DATABASE_NAME = process.env.MONGODB_DB || 'your_database_name';

// Construct the connection URI with credentials
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${DATABASE_NAME}?retryWrites=true&w=majority`;

const options = {
    maxPoolSize: 10,
    minPoolSize: 5,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    authSource: 'admin',
    authMechanism: AuthMechanism.MONGODB_SCRAM_SHA1,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Interface for MongoDB error structure
interface MongoDBError {
    code: number;
    message: string;
}

// Type guard to check if an error is a MongoDB error
function isMongoDBError(error: unknown): error is MongoDBError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as Record<string, unknown>).code === 'number' &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    );
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect()
            .catch(err => {
                console.error('Failed to connect to MongoDB:', err);
                if (isMongoDBError(err) && err.code === 8000) {
                    console.error('Authentication failed. Please check your credentials.');
                }
                throw err;
            });
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
        .catch(err => {
            console.error('Failed to connect to MongoDB:', err);
            if (isMongoDBError(err) && err.code === 8000) {
                console.error('Authentication failed. Please check your credentials.');
            }
            throw err;
        });
}

/**
 * Connects to the MongoDB database with authentication
 * @returns {Promise<{db: Db, client: MongoClient}>}
 */
export async function connectToDatabase(): Promise<{ db: Db; client: MongoClient }> {
    try {
        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);

        // Test the connection and authentication
        await db.command({ ping: 1 });
        console.log('Successfully connected to MongoDB with authentication.');

        return { db, client };
    } catch (error: unknown) {
        console.error('Error connecting to database:', error);

        if (isMongoDBError(error) && error.code === 8000) {
            throw new Error('Authentication failed. Please verify your MongoDB credentials.');
        }
        throw new Error('Unable to establish database connection');
    }
}

/**
 * Closes the MongoDB connection
 * @returns {Promise<void>}
 */
export async function closeConnection(): Promise<void> {
    try {
        const { client } = await connectToDatabase();
        await client.close();
        console.log('MongoDB connection closed.');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error;
    }
}

export default clientPromise;