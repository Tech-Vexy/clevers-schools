
export interface User {
    _id: string;
    email: string;
    password: string; // Hashed password
    createdAt: Date;
    updatedAt: Date;
}

export interface SearchResult {
    id: string;
    name: string;
    mimeType: string;
    webViewLink: string;
    modifiedTime: string;
    parents: string[];
  }
  
 export interface SearchResponse {
    files: SearchResult[];
    nextPageToken: string | null;
    total: number;
  }
export interface Subscription {
    userId: string;
    planId: string;
    status: boolean;
    startDate: Date;
    endDate: Date;
    paymentReference: string;
    lastUpdated: Date;
}

export interface SessionDocument {
    userId: string;
    sessionToken: string;
    expires: Date;
    createdAt: Date;
  }
  
export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
}

export interface Document {
    _id: string;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentConfig {
    publicKey: string;
    currency: string;
}

// MongoDB Schema Definitions
import { Schema, model, Document as MongoDocument } from 'mongoose';

export interface UserDocument extends MongoDocument {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export interface SubscriptionDocument extends MongoDocument {
    userId: string;
    planId: string;
    status: boolean;
    startDate: Date;
    endDate: Date;
    paymentReference: string;
    lastUpdated: Date;
}

const SubscriptionSchema = new Schema<SubscriptionDocument>({
    userId: { type: String, required: true },
    planId: { type: String, required: true },
    status: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    paymentReference: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

export const UserModel = model<UserDocument>('User', UserSchema);
export const SubscriptionModel = model<SubscriptionDocument>('Subscription', SubscriptionSchema);