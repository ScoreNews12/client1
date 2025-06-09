
"use client";

import type { Comment as CommentType } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock }_ from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CommentCardProps {
  comment: CommentType;
}

export default function CommentCard({ comment }: CommentCardProps) {

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  return (
    <Card className="mb-4 bg-secondary/30 shadow-sm animate-fade-in">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center gap-2">
           <Avatar className="h-8 w-8">
              <AvatarImage src={`https://placehold.co/32x32/E6E6FA/4B0082?text=${getInitials(comment.authorUsername)}`} alt={comment.authorUsername} data-ai-hint="avatar user"/>
              <AvatarFallback>{getInitials(comment.authorUsername)}</AvatarFallback>
            </Avatar>
          <div>
            <p className="text-sm font-semibold">{comment.authorUsername}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> 
              <time dateTime={comment.timestamp}>
                {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
              </time>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-sm text-foreground/90">{comment.content}</p>
      </CardContent>
    </Card>
  );
}
