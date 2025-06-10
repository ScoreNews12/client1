
"use client";

import { useThreads } from '@/contexts/ThreadsContext';
import { Button } from '@/components/ui/button';
import { format, formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'; // Removed MessageSquare as it's not used
import { useState } from 'react';
import type { Comment } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminThreadList() {
  const { threads, deleteThread, deleteComment, isLoading } = useThreads();
  const { toast } = useToast();
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(null);

  const handleDeleteThread = async (threadId: string, threadTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the thread: "${threadTitle}"? This will also delete all its comments.`)) {
      try {
        const success = await deleteThread(threadId);
        if (success) {
          toast({
            title: "Thread Deleted",
            description: `Successfully deleted thread: "${threadTitle}".`,
          });
        } else {
          toast({
            title: "Deletion Failed",
            description: `Thread "${threadTitle}" could not be deleted. It might have already been removed or an error occurred on the server.`,
            variant: "destructive",
          });
        }
      } catch (error) {
         console.error("Error trying to delete thread from AdminThreadList:", error);
         toast({
            title: "Error",
            description: "An unexpected error occurred while trying to delete the thread.",
            variant: "destructive",
          });
      }
    }
  };

  const handleDeleteComment = async (threadId: string, commentId: string, commentContent: string) => {
    if (window.confirm(`Are you sure you want to delete this comment: "${commentContent.substring(0, 50)}..."?`)) {
      try {
        const success = await deleteComment(threadId, commentId);
        if (success) {
          toast({
            title: "Comment Deleted",
            description: `Successfully deleted comment.`,
          });
        } else {
          toast({
            title: "Deletion Failed",
            description: "Comment could not be deleted. It might have already been removed or an error occurred on the server.",
            variant: "destructive",
          });
        }
      } catch (error) {
         console.error("Error trying to delete comment from AdminThreadList:", error);
         toast({
            title: "Error",
            description: "An unexpected error occurred while trying to delete the comment.",
            variant: "destructive",
          });
      }
    }
  };

  const toggleComments = (threadId: string) => {
    setExpandedThreadId(expandedThreadId === threadId ? null : threadId);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-3 border border-gray-300 bg-white space-y-2">
            <Skeleton className="h-5 bg-gray-200 rounded w-3/4" />
            <Skeleton className="h-3 bg-gray-200 rounded w-1/2" />
            <Skeleton className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="flex justify-between mt-1">
              <Skeleton className="h-8 bg-blue-200 rounded w-24" />
              <Skeleton className="h-8 bg-red-200 rounded w-20" />
            </div>
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
            <div className="flex flex-col space-y-1 items-end shrink-0 ml-2">
              <Button
                variant="outline"
                size="sm"
                className="px-2 py-0.5 h-auto text-xs bg-form-button-background text-form-button-text border-form-button-border hover:bg-gray-300"
                onClick={() => toggleComments(thread.id)}
                disabled={thread.comments.length === 0}
              >
                {expandedThreadId === thread.id ? <ChevronUp className="mr-1 h-3 w-3" /> : <ChevronDown className="mr-1 h-3 w-3" />}
                Comments ({thread.comments.length})
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="px-2 py-0.5 h-auto text-xs bg-red-600 hover:bg-red-700 text-white border-red-700"
                onClick={() => handleDeleteThread(thread.id, thread.title)}
              >
                <Trash2 className="mr-1 h-3 w-3" /> Delete Thread
              </Button>
            </div>
          </div>
          <p className="mt-1.5 text-foreground/80 text-sm line-clamp-2">{thread.content}</p>
          
          {expandedThreadId === thread.id && thread.comments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-comment-card-border space-y-2">
              <h4 className="text-sm font-semibold text-poll-title-text mb-1">Comments:</h4>
              {thread.comments.map((comment: Comment) => (
                <div key={comment.id} className="p-2 border border-comment-card-border bg-comment-card-background/80 text-[11px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-muted-foreground">
                        By: <span className="font-medium text-green-600">{comment.authorUsername}</span> ({comment.authorEmail})
                      </p>
                      <p className="text-muted-foreground">
                        Posted: {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </p>
                      <p className="text-foreground/80 mt-0.5 text-xs">{comment.content}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="px-1.5 py-0 h-auto text-[10px] bg-red-500 hover:bg-red-600 text-white border-red-600"
                      onClick={() => handleDeleteComment(thread.id, comment.id, comment.content)}
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
