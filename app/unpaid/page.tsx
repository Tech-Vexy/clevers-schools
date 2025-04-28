// app/unpaid/page.js
"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, AlertTriangle, CreditCard, Clock } from "lucide-react";

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
    <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Required</h1>
          <p className="text-gray-500">Your website is currently in unpaid status</p>
        </div>
        
        <div className="bg-amber-50 p-5 rounded-lg mb-8 border-l-4 border-amber-400">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Important Notice</h3>
              <p className="text-sm text-amber-700 mt-1">
                This website has not been paid for in full. To continue using all services and features, please complete your payment as soon as possible.
              </p>
            </div>
          </div>
        </div>
        
        {/* Countdown Timer */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center justify-center">
            <Clock className="h-5 w-5 mr-2 text-red-500" />
            Website Takedown Timer
          </h2>
          
          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
            <div className="flex flex-col items-center">
              <div className="bg-white text-red-600 rounded-lg px-4 py-3 font-bold text-2xl shadow-sm border border-gray-100">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <span className="text-xs mt-2 text-gray-600 font-medium">Days</span>
            </div>
            <div className="text-gray-300 text-2xl font-light">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-red-600 rounded-lg px-4 py-3 font-bold text-2xl shadow-sm border border-gray-100">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-xs mt-2 text-gray-600 font-medium">Hours</span>
            </div>
            <div className="text-gray-300 text-2xl font-light">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-red-600 rounded-lg px-4 py-3 font-bold text-2xl shadow-sm border border-gray-100">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-xs mt-2 text-gray-600 font-medium">Minutes</span>
            </div>
            <div className="text-gray-300 text-2xl font-light">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-red-600 rounded-lg px-4 py-3 font-bold text-2xl shadow-sm border border-gray-100">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-xs mt-2 text-gray-600 font-medium">Seconds</span>
            </div>
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-3">
            After this timer expires, the website will be taken down automatically.
          </p>
        </div>
        
        <div className="space-y-5">
          <h3 className="text-lg font-medium text-gray-700 text-center mb-4">Contact the Developer</h3>
          
          <a 
            href="mailto:eveliaveldrine@outlook.com" 
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full shadow-sm"
          >
            <Mail className="h-5 w-5 mr-2" />
            <span className="font-medium">Email Developer</span>
          </a>
          
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full absolute"></div>
            <span className="relative bg-white px-4 text-sm text-gray-500">OR</span>
          </div>
          
          <a 
            href="tel:+254726902988"
            className="flex items-center justify-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors w-full shadow-sm"
          >
            <Phone className="h-5 w-5 mr-2" />
            <span className="font-medium">Call Developer</span>
          </a>
          
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full absolute"></div>
            <span className="relative bg-white px-4 text-sm text-gray-500">OR</span>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>For any questions or concerns, please contact technical support.</p>
        </div>
      </div>
    </div>
  );
}
