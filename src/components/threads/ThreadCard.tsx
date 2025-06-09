
"use client";

import Link from 'next/link';
import type { Thread } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, UserCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ThreadCardProps {
  thread: Thread;
}

export default function ThreadCard({ thread }: ThreadCardProps) {
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader>
        <Link href={`/thread/${thread.id}`} className="hover:text-primary transition-colors">
          <CardTitle className="text-xl md:text-2xl font-headline">{thread.title}</CardTitle>
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://placehold.co/24x24/E6E6FA/4B0082?text=${getInitials(thread.authorUsername)}`} alt={thread.authorUsername} data-ai-hint="avatar user" />
              <AvatarFallback>{getInitials(thread.authorUsername)}</AvatarFallback>
            </Avatar>
            <span>{thread.authorUsername}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <time dateTime={thread.timestamp}>
              {formatDistanceToNow(new Date(thread.timestamp), { addSuffix: true })}
            </time>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-foreground/80">{thread.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-sm text-accent">
          <MessageCircle className="h-4 w-4" />
          <span>{thread.comments.length} comment{thread.comments.length !== 1 ? 's' : ''}</span>
        </div>
        <Link href={`/thread/${thread.id}`} className="text-sm text-primary hover:underline">
          Read More &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
