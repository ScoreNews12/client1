
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
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">No threads yet. Be the first to start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

function CardSkeleton() { // Simplified skeleton for retro theme
  return (
    <div className="border border-gray-300 p-2 space-y-1 bg-white">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-1/2 bg-gray-200" />
        <Skeleton className="h-3 w-1/4 bg-gray-200" />
      </div>
      <Skeleton className="h-3 w-full bg-gray-200" />
      <Skeleton className="h-3 w-5/6 bg-gray-200" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-1/5 bg-gray-200" />
        <Skeleton className="h-3 w-1/6 bg-gray-200" />
      </div>
    </div>
  )
}
