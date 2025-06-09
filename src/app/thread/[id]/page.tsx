
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useThreads } from '@/contexts/ThreadsContext';
import CommentForm from '@/components/threads/CommentForm';
import CommentList from '@/components/threads/CommentList';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton'; // Keep for loading state

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const { getThreadById, isLoading: threadsLoading } = useThreads();
  const threadId = typeof params.id === 'string' ? params.id : '';
  
  const thread = getThreadById(threadId);

  if (threadsLoading) {
    return <ThreadPageSkeleton />; // You can define a simpler skeleton
  }

  if (!thread) {
    return (
      <div className="text-center py-10 px-3">
        <h1 className="text-xl font-headline font-bold mb-3">Thread Not Found</h1>
        <p className="text-muted-foreground mb-4 text-sm">The thread you are looking for does not exist or may have been deleted.</p>
        <Button asChild className="text-xs px-3 py-1 h-auto bg-form-button-background text-form-button-text border-form-button-border hover:bg-gray-300">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-2 md:p-3 text-xs">
      <div className="border border-thread-card-border bg-thread-card-background p-3 animate-fade-in">
        <div className="mb-2">
          <h1 className="text-lg md:text-xl font-headline font-bold text-primary">{thread.title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground mt-0.5">
            <span>
              Posted by: <span className="text-green-700 font-semibold">{thread.authorUsername || 'Anonymous'}</span>
            </span>
            <time dateTime={thread.timestamp}>
              {format(new Date(thread.timestamp), "yyyy/MM/dd (EEE) HH:mm:ss")}
            </time>
            <span>
              {thread.comments.length} comment{thread.comments.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm">
          {thread.content}
        </div>
      </div>

      <div>
        {/* Removed "Comments" heading to match flatter style */}
        <CommentList comments={thread.comments} />
        <CommentForm threadId={thread.id} />
      </div>
       <div className="mt-4 text-center">
        <Button asChild variant="link" className="text-primary text-xs p-0 h-auto">
           <Link href="/">← Back to Board</Link>
        </Button>
      </div>
    </div>
  );
}


function ThreadPageSkeleton() { // Simplified skeleton
  return (
    <div className="space-y-3 p-3">
      <div className="border border-gray-300 bg-white p-3">
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
        <div className="flex gap-x-3 text-xs">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
        <Skeleton className="h-3 w-full mt-2 bg-gray-200" />
        <Skeleton className="h-3 w-5/6 mt-1 bg-gray-200" />
      </div>
      <div>
        <Skeleton className="h-5 w-1/4 mb-2 bg-gray-200" />
        {/* Comment skeletons can be added if needed */}
      </div>
    </div>
  );
}
