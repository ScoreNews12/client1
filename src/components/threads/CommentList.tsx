
"use client";

import type { Comment as CommentType } from '@/lib/types';
import CommentCard from './CommentCard';

interface CommentListProps {
  comments: CommentType[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground text-xs">No comments yet. Be the first to reply!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-2">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
