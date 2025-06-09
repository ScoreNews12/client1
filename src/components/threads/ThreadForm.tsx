
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useThreads } from '@/contexts/ThreadsContext';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

export default function ThreadForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const { addThread } = useThreads();
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to post a thread.',
        variant: 'destructive',
      });
      return;
    }
    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a title and content for your thread.',
        variant: 'destructive',
      });
      return;
    }

    addThread({
      title,
      content,
      authorEmail: user.email,
      authorUsername: user.username,
    });

    toast({
      title: 'Thread Posted!',
      description: 'Your thread is now live.',
    });
    setTitle('');
    setContent('');
  };

  if (!user) {
    return (
      <Card className="mb-8 animate-fade-in"> {/* Removed shadow-lg */}
        <CardHeader>
          <CardTitle className="font-headline">Login to Post</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You need to be logged in to create a new thread. Please login or sign up.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 animate-fade-in"> {/* Removed shadow-lg */}
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Create a New Thread</CardTitle>
        <CardDescription>Share your thoughts with the EchoThread community.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="thread-email">Email</Label>
            <Input id="thread-email" type="email" value={user.email} readOnly disabled />
          </div>
          <div className="space-y-1">
            <Label htmlFor="thread-username">Username</Label>
            <Input id="thread-username" type="text" value={user.username} readOnly disabled />
          </div>
          <div className="space-y-1">
            <Label htmlFor="thread-title">Title</Label>
            <Input
              id="thread-title"
              placeholder="Enter thread title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="thread-content">Content</Label>
            <Textarea
              id="thread-content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full sm:w-auto">
            <Send className="mr-2 h-4 w-4" /> Post Thread
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
