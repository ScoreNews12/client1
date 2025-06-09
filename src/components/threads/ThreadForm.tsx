
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useThreads } from '@/contexts/ThreadsContext';
import { useToast } from '@/hooks/use-toast';

export default function ThreadForm() {
  const [authorUsername, setAuthorUsername] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const { addThread } = useThreads();
  const { toast } = useToast();

  const handleReset = () => {
    setAuthorUsername('');
    setAuthorEmail('');
    setTitle('');
    setContent('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!authorUsername.trim() || !authorEmail.trim() || !title.trim() || !content.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields: Name, E-mail, Title, and Content.',
        variant: 'destructive',
      });
      return;
    }

    addThread({
      title,
      content,
      authorEmail,
      authorUsername,
    });

    toast({
      title: 'Thread Posted!',
      description: 'Your thread is now live.',
    });
    handleReset(); // Clear form fields
  };

  return (
    <div className="mb-8 p-6 rounded-none border-t border-b border-purple-400" style={{ backgroundColor: 'hsl(255, 30%, 92%)' }}>
      <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-3">
        <div className="flex items-center space-x-2">
          <Label htmlFor="thread-username" className="w-20 text-red-700 font-semibold">Name:</Label>
          <Input
            id="thread-username"
            placeholder="Your name"
            value={authorUsername}
            onChange={(e) => setAuthorUsername(e.target.value)}
            required
            className="flex-1 bg-white border-gray-400 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="thread-email" className="w-20 text-red-700 font-semibold">E-mail:</Label>
          <Input
            id="thread-email"
            type="email"
            placeholder="Your e-mail"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            required
            className="flex-1 bg-white border-gray-400 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="thread-title" className="w-20 text-red-700 font-semibold">Title:</Label>
          <Input
            id="thread-title"
            placeholder="Thread title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-1 bg-white border-gray-400 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div>
          <Label htmlFor="thread-content" className="block mb-1 text-red-700 font-semibold">Content:</Label>
          <Textarea
            id="thread-content"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="bg-white border-gray-400 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="flex space-x-2 pt-2">
          <Button 
            type="submit"
            className="px-4 py-1.5 bg-neutral-200 border border-neutral-400 rounded-sm text-sm text-black hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1"
          >
            Post
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
