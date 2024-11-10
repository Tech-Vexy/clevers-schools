import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // Add any custom middleware logic here
        console.log("Middleware executed for request:", req.url);
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/document/:path*",
        "/api/downloads/:path*",
        "/api/subscription/:path*",
    ],
};