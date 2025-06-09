
"use client";

import ThreadForm from '@/components/threads/ThreadForm';
import ThreadList from '@/components/threads/ThreadList';
import { useThreads } from '@/contexts/ThreadsContext';
import TodaysPoll from '@/components/custom/TodaysPoll';
import BoardRules from '@/components/custom/BoardRules';

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
    </div>
  );
}
