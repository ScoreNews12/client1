
"use client";

import type { Comment as CommentType } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface CommentCardProps {
  comment: CommentType;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="mb-2 p-2 border border-comment-card-border bg-comment-card-background text-xs animate-fade-in">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="font-semibold text-green-700">{comment.authorUsername || 'Anonymous'}</span>
        <span className="text-muted-foreground text-[10px]">
          ({formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })})
        </span>
        <a href={`#comment-${comment.id}`} className="text-primary hover:text-accent text-[10px]">ID:{comment.id.substring(0,6)}</a>
      </div>
      <p className="text-foreground/90 text-sm leading-snug">{comment.content}</p>
    </div>
  );
}
