'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, XCircle } from 'lucide-react';

interface Session {
  sessionToken: string;
  userAgent: string;
  lastAccessedAt: {
    $date: {
      $numberLong: string;
    };
  };
}

const MAX_SESSIONS = 2;

const formatDate = (date: { $date?: { $numberLong?: string } | string }) => {
  if (!date) return 'Unknown';

  let timestamp;

  if (typeof date === 'string') {
    timestamp = Date.parse(date);
  } else if (date.$date) {
    if (typeof date.$date === 'string') {
      timestamp = Date.parse(date.$date);
    } else if (date.$date.$numberLong) {
      timestamp = parseInt(date.$date.$numberLong, 10);
    }
  }

  if (!timestamp || isNaN(timestamp)) return 'Invalid date';
  return new Date(timestamp).toLocaleString();
};

// Separate component for the error content
const AuthErrorContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [terminatingSession, setTerminatingSession] = useState('');

  const errorType = searchParams.get('type');
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const isMaxSessionsError = errorType === 'MAX_SESSIONS_REACHED';

  useEffect(() => {
    if (isMaxSessionsError) {
      fetchActiveSessions();
    }
  }, [isMaxSessionsError]);

  const fetchActiveSessions = async () => {
    try {
      const response = await fetch('/api/auth/sessions');
      if (!response.ok) throw new Error('Failed to fetch sessions');
      const data = await response.json();
      setActiveSessions(data);
    } catch {
      setErrorMessage('Failed to load active sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleTerminateSession = async (sessionToken: string) => {
    setTerminatingSession(sessionToken);
    try {
      const response = await fetch('/api/auth/sessions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionToken }),
      });

      if (!response.ok) throw new Error('Failed to terminate session');
      
      // Redirect back to sign in with the callback URL preserved
      const searchParams = new URLSearchParams();
      if (callbackUrl) searchParams.set('callbackUrl', callbackUrl);
      router.push(`/auth/signin?${searchParams.toString()}`);
    } catch {
      setErrorMessage('Failed to terminate session');
      setTerminatingSession('');
    }
  };

  const getErrorDisplay = () => {
    switch (errorType) {
      case 'MAX_SESSIONS_REACHED':
        return `Maximum limit of ${MAX_SESSIONS} active sessions reached`;
      case 'CredentialsSignin':
        return 'Invalid email or password';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to access this resource.';
      default:
        return errorType || 'An error occurred during authentication';
    }
  };

  if (!isMaxSessionsError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Alert className="max-w-md" variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{getErrorDisplay()}</AlertDescription>
          <Button 
            className="mt-4 w-full"
            variant="outline"
            onClick={() => {
              const searchParams = new URLSearchParams();
              if (callbackUrl) searchParams.set('callbackUrl', callbackUrl);
              router.push(`/auth/signin?${searchParams.toString()}`);
            }}
          >
            Back to Sign In
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-2xl w-full mx-4">
        <CardHeader>
          <CardTitle>Maximum Sessions Reached</CardTitle>
          <CardDescription>
            You have reached the maximum limit of {MAX_SESSIONS} active sessions. 
            Please terminate one of your existing sessions to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : errorMessage ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div 
                  key={session.sessionToken}
                  className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
                >
                  <div>
                    <p className="font-medium">{session.userAgent}</p>
                    <p className="text-sm text-gray-500">
                      Last active: {formatDate(session.lastAccessedAt)}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    disabled={terminatingSession === session.sessionToken}
                    onClick={() => handleTerminateSession(session.sessionToken)}
                  >
                    {terminatingSession === session.sessionToken ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Terminate'
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={() => {
              const searchParams = new URLSearchParams();
              if (callbackUrl) searchParams.set('callbackUrl', callbackUrl);
              router.push(`/auth/signin?${searchParams.toString()}`);
            }}
          >
            Back to Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Main component wrapped in Suspense
const AuthError = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
};

export default AuthError;