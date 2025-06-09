
"use client";

import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLoginPage() {
  const { isAdminAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAdminAuthenticated) {
      router.replace('/admin/dashboard');
    }
  }, [isAdminAuthenticated, isLoading, router]);

  if (isLoading || isAdminAuthenticated) {
    // Show a loading state or a blank page while redirecting
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Skeleton className="h-12 w-1/2 mb-6 bg-gray-300" />
            <div className="w-full max-w-md space-y-4">
                <Skeleton className="h-10 w-full bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-300 mt-2" />
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-5">
      <AdminLoginForm />
    </div>
  );
}
