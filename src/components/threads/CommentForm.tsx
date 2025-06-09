
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
  const [authorUsername, setAuthorUsername] = useState('Anonymous'); // Default to Anonymous
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  
  const { addComment } = useThreads();
  const { toast } = useToast();

  const handleReset = () => {
    // setAuthorUsername('Anonymous');
    // setAuthorEmail('');
    setContent('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in the Comment field.',
        variant: 'destructive',
      });
      return;
    }

    addComment(threadId, {
      content,
      authorEmail: authorEmail.trim(),
      authorUsername: authorUsername.trim() || "Anonymous",
    });

    toast({
      title: 'Comment Posted!',
      description: 'Your comment is now live.',
    });
    handleReset();
  };

  return (
    <div className="mt-3 p-3 bg-form-background border-t border-b border-form-input-border">
      <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <Label htmlFor={`comment-username-${threadId}`} className="w-12 text-form-label-text font-normal">Name:</Label>
          <Input
            id={`comment-username-${threadId}`}
            placeholder="Anonymous"
            value={authorUsername}
            onChange={(e) => setAuthorUsername(e.target.value)}
            className="flex-1 bg-form-input-background border-form-input-border text-foreground h-6 px-1 py-0.5 text-xs"
          />
           <Label htmlFor={`comment-email-${threadId}`} className="w-12 text-form-label-text font-normal ml-2">E-mail:</Label>
          <Input
            id={`comment-email-${threadId}`}
            type="email"
            placeholder="(sage)"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="flex-1 bg-form-input-background border-form-input-border text-foreground h-6 px-1 py-0.5 text-xs"
          />
        </div>
        <div>
          <Label htmlFor={`comment-content-${threadId}`} className="block mb-0.5 text-form-label-text font-normal">Comment:</Label>
          <Textarea
            id={`comment-content-${threadId}`}
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={2}
            className="bg-form-input-background border-form-input-border text-foreground p-1 text-xs min-h-[50px]"
          />
        </div>
        <div className="flex space-x-2 pt-1">
          <Button 
            type="submit"
            className="px-3 py-0.5 h-6 bg-form-button-background border border-form-button-border rounded-none text-xs text-form-button-text hover:bg-gray-300 focus:ring-0"
          >
            Post Comment
          </Button>
          <Button 
            type="reset"
            variant="outline"
            className="px-3 py-0.5 h-6 bg-form-button-background border border-form-button-border rounded-none text-xs text-form-button-text hover:bg-gray-300 focus:ring-0"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
