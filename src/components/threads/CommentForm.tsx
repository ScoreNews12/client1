
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useThreads } from '@/contexts/ThreadsContext';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

interface CommentFormProps {
  threadId: string;
}

export default function CommentForm({ threadId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const { addComment } = useThreads();
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to post a comment.',
        variant: 'destructive',
      });
      return;
    }
    if (!content.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide content for your comment.',
        variant: 'destructive',
      });
      return;
    }

    addComment(threadId, {
      content,
      authorEmail: user.email,
      authorUsername: user.username,
    });

    toast({
      title: 'Comment Posted!',
      description: 'Your comment is now live.',
    });
    setContent('');
  };

  if (!user) {
    return (
      <Card className="mt-6 animate-fade-in">
        <CardHeader>
          <CardTitle className="font-headline text-lg">Login to Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">You need to be logged in to add a comment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 animate-fade-in"> {/* Removed shadow-md */}
      <CardHeader>
        <CardTitle className="font-headline text-lg">Add a Comment</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor={`comment-email-${threadId}`}>Email</Label>
              <Input id={`comment-email-${threadId}`} type="email" value={user.email} readOnly disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`comment-username-${threadId}`}>Username</Label>
              <Input id={`comment-username-${threadId}`} type="text" value={user.username} readOnly disabled />
            </div>
          <div className="space-y-1">
            <Label htmlFor={`comment-content-${threadId}`}>Your Comment</Label>
            <Textarea
              id={`comment-content-${threadId}`}
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" /> Post Comment
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
