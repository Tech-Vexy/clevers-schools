import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  ArrowRight } from "lucide-react";

export default function Login() {
    return (
        <div className="h-4 bg-white p-auto top-auto">
            <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-green-400 border-b border-gray-200 py-4">
                    <CardTitle className="text-2xl text-center font-normal text-white flex items-center justify-center ">
                       
                        LOGIN AREA
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="text-center space-y-4">
                        <p className="text-gray-600 mb-4">
                            Access your personal account securely
                        </p>
                        <Link href="/auth/signin"  target="_self"  className="block">
                            <Button className="w-full" variant="default">
                                Log In
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="text-sm text-gray-500 mt-4">
                            Don&#39;t have an account?
                            <Link href="/auth/register" target="_self" className="text-primary hover:underline ml-1">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}