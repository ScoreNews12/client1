
"use client";

import type { Thread } from '@/lib/types';
import ThreadCard from './ThreadCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ThreadListProps {
  threads: Thread[];
  isLoading?: boolean;
}

export default function ThreadList({ threads, isLoading = false }: ThreadListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-headline mb-2">No Threads Yet</h2>
        <p className="text-muted-foreground">Be the first to start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="border bg-card text-card-foreground shadow-sm rounded-lg p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/5" />
        <Skeleton className="h-4 w-1/6" />
      </div>
    </div>
  )
}
