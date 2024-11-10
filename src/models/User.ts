import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ISubscription {
    status: boolean;
    createDate: Date;
    endDate: Date;
}

export interface IUser extends Document {
    email: string;
    password: string;
    subscription: ISubscription;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
    subscription: {
        status: {
            type: Boolean,
            default: false,
        },
        createDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
            default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
    },
}, {
    timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: unknown) {
        // Convert unknown error to CallbackError
        const callbackError: CallbackError = error instanceof Error
            ? new Error(error.message)
            : new Error('An unknown error occurred during password hashing');

        next(callbackError);
    }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);