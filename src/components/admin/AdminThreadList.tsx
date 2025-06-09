
"use client";

import { useThreads } from '@/contexts/ThreadsContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function AdminThreadList() {
  const { threads, deleteThread, isLoading } = useThreads();
  const { toast } = useToast();

  const handleDelete = (threadId: string, threadTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the thread: "${threadTitle}"?`)) {
      deleteThread(threadId);
      toast({
        title: "Thread Deleted",
        description: `Successfully deleted thread: "${threadTitle}".`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-3 border border-gray-300 bg-white space-y-2">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-red-200 rounded w-20 mt-1"></div>
          </div>
        ))}
      </div>
    );
  }

  if (threads.length === 0) {
    return <p className="text-center text-muted-foreground py-5">No threads to display.</p>;
  }

  return (
    <div className="space-y-3 text-xs">
      {threads.map((thread) => (
        <div key={thread.id} className="p-3 border border-thread-card-border bg-thread-card-background">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-headline font-semibold text-primary mb-0.5">
                <Link href={`/thread/${thread.id}`} target="_blank" className="hover:underline">
                    {thread.title}
                </Link>
              </h3>
              <p className="text-muted-foreground text-[11px] mb-1">
                By: <span className="font-medium text-green-700">{thread.authorUsername}</span> ({thread.authorEmail})
              </p>
              <p className="text-muted-foreground text-[11px] mb-1">
                Posted: {format(new Date(thread.timestamp), "yyyy/MM/dd HH:mm:ss")}
              </p>
              <p className="text-muted-foreground text-[11px]">
                Comments: {thread.comments.length}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="px-2 py-0.5 h-auto text-xs bg-red-600 hover:bg-red-700 text-white border-red-700"
              onClick={() => handleDelete(thread.id, thread.title)}
            >
              Delete
            </Button>
          </div>
          <p className="mt-1.5 text-foreground/80 text-sm line-clamp-2">{thread.content}</p>
        </div>
      ))}
    </div>
  );
}
