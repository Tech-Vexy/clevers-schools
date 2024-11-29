"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import type { SessionData } from "@/lib/session";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "MAX_SESSIONS_REACHED") {
      void fetch("/api/sessions")
        .then((res) => res.json())
        .then((data: SessionData[]) => {
          setSessions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
          setLoading(false);
        });
    }
  }, [error]);

  const handleTerminateSession = async (sessionToken: string) => {
    try {
      await fetch("/api/sessions", {
        method: "DELETE",
        body: JSON.stringify({ sessionToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Retry sign in
      void signIn("credentials", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Error terminating session:", error);
    }
  };

  if (error === "MAX_SESSIONS_REACHED") {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Maximum Sessions Reached</h1>
        <p className="mb-4">
          You have reached the maximum number of active sessions (2).
          Please terminate one of your existing sessions to continue:
        </p>
        
        {loading ? (
          <p>Loading sessions...</p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li key={session._id.toString()} className="border p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Device: {session.userAgent}</p>
                    <p className="text-sm text-gray-500">
                      Last active: {new Date(session.lastAccessedAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => void handleTerminateSession(session.sessionToken)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Terminate
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Authentication Error</h1>
      <p>{error}</p>
    </div>
  );
}

