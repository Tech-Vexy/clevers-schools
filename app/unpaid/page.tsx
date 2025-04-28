// app/unpaid/page.js
"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, AlertTriangle } from "lucide-react";

export default function UnpaidPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set the date 7 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    // Initial calculation
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clear on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            <h1 className="text-2xl font-bold text-red-600">Payment Required</h1>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
            <p className="text-gray-800 mb-2">
              This site has not been paid for in full yet.
            </p>
            <p className="text-gray-700 text-sm">
              If you are the owner of this site, please contact the developer to complete the payment and gain access to the website content.
            </p>
          </div>
          
          {/* Countdown Timer */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-red-700 mb-2">Site Takedown Countdown</h2>
            <p className="text-sm text-gray-600 mb-3">
              This site will be taken down by the developer in:
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="bg-red-100 text-red-800 rounded-md px-3 py-2 font-bold text-xl">
                  {timeLeft.days}
                </div>
                <span className="text-xs mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-red-100 text-red-800 rounded-md px-3 py-2 font-bold text-xl">
                  {timeLeft.hours}
                </div>
                <span className="text-xs mt-1">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-red-100 text-red-800 rounded-md px-3 py-2 font-bold text-xl">
                  {timeLeft.minutes}
                </div>
                <span className="text-xs mt-1">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-red-100 text-red-800 rounded-md px-3 py-2 font-bold text-xl">
                  {timeLeft.seconds}
                </div>
                <span className="text-xs mt-1">Seconds</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <a 
                href="mailto:eveliaveldrine@outlook.com" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-48"
              >
                Email Developer
              </a>
            </div>
            
            <div className="flex items-center justify-center">
              <span className="px-4 text-gray-500">OR</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5 text-green-600" />
              <a 
                href="tel:+254726902988"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-48"
              >
                Call Developer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}