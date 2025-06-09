
"use client";

import Link from 'next/link';
import type { Thread } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface ThreadCardProps {
  thread: Thread;
}

export default function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <div className="mb-2 p-2 border border-thread-card-border bg-thread-card-background text-xs animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-sm text-primary">{thread.title}</span>
        <span className="text-muted-foreground">
          by: <span className="text-green-700 font-semibold">{thread.authorUsername || 'Anonymous'}</span>
        </span>
        <span className="text-muted-foreground text-[10px]">
          ({formatDistanceToNow(new Date(thread.timestamp), { addSuffix: true })})
        </span>
      </div>
      <p className="text-foreground/90 line-clamp-2 mb-1">{thread.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">
          {thread.comments.length} comment{thread.comments.length !== 1 ? 's' : ''}
        </span>
        <Link href={`/thread/${thread.id}`} className="text-primary hover:text-accent text-xs">
          [Reply]
        </Link>
      </div>
    </div>
  );
}
