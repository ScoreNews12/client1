
"use client";

import ThreadForm from '@/components/threads/ThreadForm';
import ThreadList from '@/components/threads/ThreadList';
import { useThreads } from '@/contexts/ThreadsContext';

export default function HomePage() {
  const { threads, isLoading } = useThreads();

  return (
    <div className="space-y-8">
      <ThreadForm />
      <div>
        <h2 className="text-3xl font-headline mb-6 border-b pb-2">Latest Threads</h2>
        <ThreadList threads={threads} isLoading={isLoading} />
      </div>
    </div>
  );
}
