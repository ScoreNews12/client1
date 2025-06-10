
"use client";

import AdminThreadList from '@/components/admin/AdminThreadList';
import AdminPollManager from '@/components/admin/AdminPollManager'; // Import Poll Manager
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

export default function AdminDashboardPage() {
  const { isAdminAuthenticated, isLoading, logout } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isAdminAuthenticated, isLoading, router]);

  if (isLoading || !isAdminAuthenticated) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-10 w-1/3 bg-gray-300" />
                    <Skeleton className="h-8 w-24 bg-gray-300" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                    <div key={i} className="p-3 border border-gray-300 bg-white space-y-2">
                        <Skeleton className="h-5 bg-gray-200 rounded w-3/4"/>
                        <Skeleton className="h-3 bg-gray-200 rounded w-1/2"/>
                        <Skeleton className="h-3 bg-gray-200 rounded w-full mt-1"/>
                        <Skeleton className="h-3 bg-gray-200 rounded w-5/6"/>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/admin/login'); 
  };

  return (
    <div className="container mx-auto px-2 py-5">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-headline font-bold text-poll-title-text">Admin Dashboard</h1>
        <Button 
            onClick={handleLogout}
            variant="outline"
            className="px-3 py-1 h-auto bg-form-button-background text-form-button-text border-form-button-border text-xs hover:bg-gray-300"
        >
            Logout
        </Button>
      </div>

      {/* Poll Management Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-headline font-semibold text-poll-title-text mb-3">Poll Management</h2>
        <AdminPollManager />
      </div>

      <Separator className="my-6 md:my-8 bg-gray-400" />

      {/* Thread Management Section */}
      <div>
        <h2 className="text-lg md:text-xl font-headline font-semibold text-poll-title-text mb-3">Thread Management</h2>
        <AdminThreadList />
      </div>
    </div>
  );
}
