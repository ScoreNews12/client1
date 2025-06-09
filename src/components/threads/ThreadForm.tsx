
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useThreads } from '@/contexts/ThreadsContext';
import { useToast } from '@/hooks/use-toast';

export default function ThreadForm() {
  const [authorUsername, setAuthorUsername] = useState('Anonymous'); // Default to Anonymous
  const [authorEmail, setAuthorEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const { addThread } = useThreads();
  const { toast } = useToast();

  const handleReset = () => {
    // setAuthorUsername('Anonymous'); // Keep Anonymous or reset if preferred
    setAuthorEmail(''); // Reset email
    setTitle('');
    setContent('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in Title and Content.',
        variant: 'destructive',
      });
      return;
    }
    if (!authorEmail.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in the E-mail field. It is required.',
        variant: 'destructive',
      });
      return;
    }

    addThread({
      title,
      content,
      authorEmail: authorEmail.trim(),
      authorUsername: authorUsername.trim() || 'Anonymous', 
    });

    toast({
      title: 'Thread Posted!',
      description: 'Your thread is now live.',
    });
    handleReset(); 
  };

  return (
    // Form container styling is handled by parent (src/app/page.tsx)
    <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-2 text-xs">
      <div className="flex items-center space-x-2">
        <Label htmlFor="thread-username" className="w-12 text-form-label-text font-normal">Name:</Label>
        <Input
          id="thread-username"
          placeholder="Anonymous"
          value={authorUsername}
          onChange={(e) => setAuthorUsername(e.target.value)}
          className="flex-1 bg-form-input-background border-form-input-border text-foreground h-6 px-1 py-0.5 text-xs"
        />
        <Label htmlFor="thread-email" className="w-12 text-form-label-text font-normal ml-2">E-mail:</Label>
        <Input
          id="thread-email"
          type="email"
          placeholder="Required (sage if desired)"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          required
          className="flex-1 bg-form-input-background border-form-input-border text-foreground h-6 px-1 py-0.5 text-xs"
        />
      </div>
       <div className="flex items-center space-x-2">
        <Label htmlFor="thread-title" className="w-12 text-form-label-text font-normal">Title:</Label>
        <Input
          id="thread-title"
          placeholder="Thread title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="flex-1 bg-form-input-background border-form-input-border text-foreground h-6 px-1 py-0.5 text-xs"
        />
      </div>
      <div>
        <Label htmlFor="thread-content" className="block mb-0.5 text-form-label-text font-normal">Content:</Label>
        <Textarea
          id="thread-content"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          className="bg-form-input-background border-form-input-border text-foreground p-1 text-xs min-h-[60px]"
        />
      </div>
      <div className="flex space-x-2 pt-1">
        <Button 
          type="submit"
          className="px-3 py-0.5 h-6 bg-form-button-background border border-form-button-border rounded-none text-xs text-form-button-text hover:bg-gray-300 focus:ring-0"
        >
          Post
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
  );
}
