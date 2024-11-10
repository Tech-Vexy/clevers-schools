// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
    try {
        // Ensure API key is configured
        if (!process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY) {
            return NextResponse.json(
                { error: 'Anthropic API key not configured' },
                { status: 500 }
            );
        }

        // Parse the request body
        const body = await request.json();
        const { messages, model = 'claude-3-opus-20240229' } = body;

        // Validate request body
        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Invalid request body: messages array is required' },
                { status: 400 }
            );
        }

        // Make request to Anthropic
        const response = await anthropic.messages.create({
            model,
            messages,
            max_tokens: 4096,
        });

        // Return the response
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error in chat route:', error);

        // Handle specific error types
        if (error instanceof Anthropic.APIError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.status || 500 }
            );
        }

        // Generic error response
        return NextResponse.json(
            { error: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}

// Optional: Add rate limiting
export const config = {
    api: {
        bodyParser: true,
        externalResolver: true,
    },
};