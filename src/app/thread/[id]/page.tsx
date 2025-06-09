
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useThreads } from '@/contexts/ThreadsContext';
import CommentForm from '@/components/threads/CommentForm';
import CommentList from '@/components/threads/CommentList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const { getThreadById, isLoading: threadsLoading } = useThreads();
  const threadId = typeof params.id === 'string' ? params.id : '';
  
  const thread = getThreadById(threadId);

  if (threadsLoading) {
    return <ThreadPageSkeleton />;
  }

  if (!thread) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-headline mb-4">Thread Not Found</h1>
        <p className="text-muted-foreground mb-6">The thread you are looking for does not exist or may have been deleted.</p>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-8">
      <Card className="animate-fade-in"> {/* Removed shadow-xl */}
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-headline">{thread.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5">
              <Avatar className="h-7 w-7">
                <AvatarImage src={`https://placehold.co/28x28/E6E6FA/4B0082?text=${getInitials(thread.authorUsername)}`} alt={thread.authorUsername} data-ai-hint="avatar user"/>
                <AvatarFallback>{getInitials(thread.authorUsername)}</AvatarFallback>
              </Avatar>
              <span>{thread.authorUsername}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <time dateTime={thread.timestamp}>
                {format(new Date(thread.timestamp), "MMMM d, yyyy 'at' h:mm a")}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>{thread.comments.length} comment{thread.comments.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap">
            {thread.content}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-headline mb-4 border-b pb-2">Comments</h2>
        <CommentList comments={thread.comments} />
        <CommentForm threadId={thread.id} />
      </div>
    </div>
  );
}


function ThreadPageSkeleton() {
  return (
    <div className="space-y-8">
      <Card> {/* Removed shadow-xl */}
        <CardHeader>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>

      <div>
        <Skeleton className="h-8 w-1/4 mb-4" />
        <div className="space-y-4 mt-6">
          {[1,2].map(i => (
            <Card key={i} className="mb-4 bg-secondary/30"> {/* Removed shadow-sm */}
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5 mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
