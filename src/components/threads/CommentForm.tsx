
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useThreads } from '@/contexts/ThreadsContext';
import { useToast } from '@/hooks/use-toast';

interface CommentFormProps {
  threadId: string;
}

export default function CommentForm({ threadId }: CommentFormProps) {
  const [authorUsername, setAuthorUsername] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  
  const { addComment } = useThreads();
  const { toast } = useToast();

  const handleReset = () => {
    setAuthorUsername('');
    setAuthorEmail('');
    setContent('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!authorUsername.trim() || !authorEmail.trim() || !content.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields: Name, E-mail, and Comment.',
        variant: 'destructive',
      });
      return;
    }

    addComment(threadId, {
      content,
      authorEmail,
      authorUsername,
    });

    toast({
      title: 'Comment Posted!',
      description: 'Your comment is now live.',
    });
    handleReset();
  };

  return (
    <div className="mt-6 p-6 rounded-none border-t border-b border-purple-400" style={{ backgroundColor: 'hsl(255, 30%, 92%)' }}>
      <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-3">
        <div className="flex items-center space-x-2">
          <Label htmlFor={`comment-username-${threadId}`} className="w-20 text-red-700 font-semibold">Name:</Label>
          <Input
            id={`comment-username-${threadId}`}
            placeholder="Your name"
            value={authorUsername}
            onChange={(e) => setAuthorUsername(e.target.value)}
            required
            className="flex-1 bg-white border-gray-400 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`comment-email-${threadId}`} className="w-20 text-red-700 font-semibold">E-mail:</Label>
          <Input
            id={`comment-email-${threadId}`}
            type="email"
            placeholder="Your e-mail"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            required
            className="flex-1 bg-white border-gray-400 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div>
          <Label htmlFor={`comment-content-${threadId}`} className="block mb-1 text-red-700 font-semibold">Comment:</Label>
          <Textarea
            id={`comment-content-${threadId}`}
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={3}
            className="bg-white border-gray-400 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="flex space-x-2 pt-2">
          <Button 
            type="submit"
            className="px-4 py-1.5 bg-neutral-200 border border-neutral-400 rounded-sm text-sm text-black hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1"
          >
            Post Comment
          </Button>
          <Button 
            type="reset"
            className="px-4 py-1.5 bg-neutral-200 border border-neutral-400 rounded-sm text-sm text-black hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
