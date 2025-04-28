// components/PaymentCheck.tsx
"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentCheckProps {
  children: ReactNode;
  paid?: boolean;
}

export default function PaymentCheck({ children, paid = false }: PaymentCheckProps) {
  const router = useRouter();
  
  useEffect(() => {
    // If not paid and not already on the unpaid page, redirect
    if (!paid && typeof window !== 'undefined' && !window.location.pathname.includes('/unpaid')) {
      router.push('/unpaid');
    }
  }, [paid, router]);

  // If already on unpaid page or payment is complete, render children
  if (paid || (typeof window !== 'undefined' && window.location.pathname.includes('/unpaid'))) {
    return <>{children}</>;
  }
  
  // Return null while redirecting
  return null;
}