
"use client";

import ThreadForm from '@/components/threads/ThreadForm';
import ThreadList from '@/components/threads/ThreadList';
import { useThreads } from '@/contexts/ThreadsContext';
import TodaysPoll from '@/components/custom/TodaysPoll';
import BoardRules from '@/components/custom/BoardRules';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { threads, isLoading } = useThreads();

  return (
    <div className="w-full">
      <TodaysPoll />
      <BoardRules />
      <div className="bg-form-background p-3 md:p-4 my-2 border-t border-b border-form-input-border">
        <ThreadForm />
      </div>
      <div className="p-2 md:p-3">
        {/* Removed title "Latest Threads" as it's not in the target design */}
        <ThreadList threads={threads} isLoading={isLoading} />
      </div>
      <div className="text-center py-4 px-2">
        <Button 
          asChild 
          variant="outline" 
          className="px-3 py-1 h-auto text-xs bg-form-button-background text-form-button-text border-form-button-border hover:bg-gray-300"
        >
          <Link href="/admin/login">Admin Panel</Link>
        </Button>
      </div>
    </div>
  );
}
