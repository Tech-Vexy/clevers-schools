'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Badge, CheckCircle, LogOut, User } from "lucide-react";
import { signOut, useSession } from 'next-auth/react';

interface SubscriptionData {
    id: string
    startDate: Date
    expiryDate: Date
    remainingDays: number
    status: string
    reference: string
    amount: number
  }
  
function SubscriptionStatus() {
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const checkSubscription = async () => {
        try {
          const response = await fetch("/api/subscription/check")
          const data = await response.json()

          if (data.isSubscribed) {
            setSubscriptionData(data.subscription)
          }
        } catch (error) {
          console.error("Error checking subscription:", error)
        } finally {
          setIsLoading(false)
        }
      }

      checkSubscription()
    }, [])

    if (isLoading) {
      return (
        <div className="mt-2 text-center py-2">
          <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="animate-pulse h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      )
    }

    if (!subscriptionData) {
      return (
        <div className="mt-2 p-2 bg-amber-50 rounded-md border border-amber-200">
          <div className="flex items-center space-x-2 text-amber-600 mb-1">
            <AlertCircle className="h-4 w-4" />
            <p className="text-xs font-medium">No Active Subscription</p>
          </div>
          <Link href="/subscribe" className="text-lg text-red-400 text-center font-bold">Subscribe</Link>
        </div>
      )
    }
    

    // Format date
    const formatDate = (date: Date): string => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }

    return (
      <div className="mt-2 p-2 bg-green-50 rounded-md border border-green-200">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-1 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <p className="text-xs font-medium">Active Subscription</p>
          </div>
          <div className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0 border border-green-200 rounded">
            {subscriptionData.remainingDays} days left
          </div>
        </div>
        <p className="text-xs text-green-700">Expires: {formatDate(new Date(subscriptionData.expiryDate))}</p>
      </div>
    )
  }
const Login = () => {
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };
    
    return (
        <>
            {!isAuthenticated ? (
                <Card className="w-full shadow-lg">
                  <CardHeader className="bg-[#00a651] border-b border-gray-200 py-4">
                    <CardTitle className="text-base font-normal text-white flex items-center justify-center">
                      LOGIN AREA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-center space-y-4">
                      <p className="text-gray-600 mb-2 text-sm">Access your personal account securely</p>
                      <Link href="/auth/signin" className="block">
                        <Button className="w-full" variant="default">
                          Log In
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <div className="text-xs text-gray-500 mt-2">
                        Don&#39;t have an account?
                        <Link href="/auth/signup" className="text-primary hover:underline ml-1">
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="w-full shadow-lg">
                  <CardHeader className="bg-[#00a651] border-b border-gray-200 py-4">
                    <CardTitle className="text-base font-normal text-white flex items-center justify-center">
                      MY ACCOUNT
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="h-8 w-8 text-gray-500" />
                      <div>
                        <p className="font-medium">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                     <SubscriptionStatus/>
                    </div>
                    <div className="flex gap-2 mt-4 p-4 ml-6 items-center">
                <Button 
                    variant="outline" 
                    className=" items-center gap-2 text-red-600" 
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4 text-center" />
                    Log out
                </Button>
            </div>
                  </CardContent>
                </Card>
              )}
        </>
    );
};



const CountyMocks = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-[#00a651] border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    COUNTY MOCKS BY YEAR
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 block">
                <ol>
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year) => (
                        <li key={year}>
                            <Link href={`../mocks/${year}`} className="text-gray-900 border-b-2">
                                20<span className="text-red-600">{year.toString().slice(-2)}</span> COUNTY MOCKS
                            </Link>
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
};

const RevisionBooklets = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-[#00a651] border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    KCSE REVISION BOOKLETS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href="../revision-booklets" className="text-blue-500">
                    FORM <span className="text-red-600">1 2 3 4</span> END TOPIC <span className="text-red-600">QUESTIONS</span> & <span className="text-purple-600">ANSWERS</span> ALL SUBJECTS
                </Link>
            </CardContent>
        </Card>
    );
};

const HolidayAssignments = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-[#00a651] border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    HOLIDAYS ASSIGNMENTS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href="../assignments" className="text-blue-500">
                    FORM <span className="text-red-600">1 2 3 4</span> TERM 1 2 3 HOLIDAY ASSIGNMENTS
                </Link>
            </CardContent>
        </Card>
    );
};

const TopicTests = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-[#00a651] border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    TOPIC BY TOPIC TEST
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href="../topic-tests" className="text-blue-500">
                    FORM <span className="text-red-600">1 2 3 4</span> END TOPIC <span className="text-purple-400">QUE&apos;S</span> & ANS&apos;S ALL SUBJECTS
                </Link>
            </CardContent>
        </Card>
    );
};

const NationalSchools = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-[#00a651] border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                NATIONAL SCHOOLS EXAMS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href='/nationals/' className='text-gray-950'>
                NATIONAL SCHOOLS EXAMS
                </Link>
            </CardContent>
        </Card>
    );
};

const LifeskillsNotes = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-[#00a651] border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                LIFE SKILLS NOTES
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href='/lifeskills' className='text-gray-950'>
                FORM 1-4 LIFE SKILLS NOTES
                </Link>
            </CardContent>
        </Card>
    );
};

const Syllabus = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-[#00a651] border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                SYLLABUS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href='/syllabus' className='text-gray-950'>
                FORM 1 TO FORM 4 SYLLABUS
                </Link>
            </CardContent>
        </Card>
    );
};

const KCSEPastPapers = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-[#00a651] border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    KCSE KNEC PASTPAPERS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {[2023, 2022, 2021, ...Array.from({ length: 13 }, (_, i) => 2020 - i)].map((year) => (
                    <Link
                        key={year}
                        href={`../kcse/${year}`}
                        className={`block text-blue-600 ${year >= 2023 ? 'font-light' : 'uppercase font-bold'}`}
                    >
                        {year >= 2021 ? (
                            <>All {year} KNEC PAST PAPERS QUE AND MS / REPORTS</>
                        ) : (
                            <>{year} KNEC PAST PAPERS QUE AND MS</>
                        )}
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
};

const RightBar = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col space-y-4 w-full p-4">
            <Login />
            <KCSEPastPapers />
            <CountyMocks />
            <TopicTests />
            <RevisionBooklets />
            <HolidayAssignments />
            <NationalSchools />
            <LifeskillsNotes />
            <Syllabus />
        </div>
    );
};

export default RightBar;