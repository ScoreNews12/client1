
"use client";

import type { Comment as CommentType } from '@/lib/types';
import CommentCard from './CommentCard';

interface CommentListProps {
  comments: CommentType[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No comments yet. Be the first to reply!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
