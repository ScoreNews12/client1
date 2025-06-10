
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import type { Poll } from '@/lib/types';
import { fetchPollAction, createPollAction, deletePollAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Trash2, PlusCircle } from 'lucide-react';

export default function AdminPollManager() {
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(''); // Comma-separated
  const { toast } = useToast();

  useEffect(() => {
    loadCurrentPoll();
  }, []);

  const loadCurrentPoll = async () => {
    setIsLoading(true);
    try {
      const poll = await fetchPollAction();
      setCurrentPoll(poll);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load current poll.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePoll = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPollQuestion.trim() || !newPollOptions.trim()) {
      toast({ title: "Missing Fields", description: "Poll question and options are required.", variant: "destructive" });
      return;
    }
    const optionsArray = newPollOptions.split('\n').map(opt => opt.trim()).filter(opt => opt);
    if (optionsArray.length < 2) {
      toast({ title: "Invalid Options", description: "Please provide at least two options, each on a new line.", variant: "destructive" });
      return;
    }

    try {
      const createdPoll = await createPollAction(newPollQuestion, optionsArray);
      setCurrentPoll(createdPoll);
      setNewPollQuestion('');
      setNewPollOptions('');
      toast({ title: "Poll Created", description: "The new poll is now active." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to create poll.", variant: "destructive" });
    }
  };

  const handleDeletePoll = async () => {
    if (!currentPoll || !window.confirm(`Are you sure you want to delete the current poll: "${currentPoll.question}"?`)) {
      return;
    }
    try {
      await deletePollAction();
      setCurrentPoll(null);
      toast({ title: "Poll Deleted", description: "The poll has been removed." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete poll.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Current Poll Section */}
      <div className="p-3 border border-thread-card-border bg-thread-card-background">
        <h3 className="text-base font-headline font-semibold text-poll-title-text mb-2">Current Active Poll</h3>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-1/2 bg-gray-200" />
            <Skeleton className="h-4 w-1/2 bg-gray-200" />
            <Skeleton className="h-8 w-24 mt-1 bg-gray-300" />
          </div>
        )}
        {!isLoading && currentPoll && (
          <div>
            <p className="font-semibold text-sm text-primary">{currentPoll.question}</p>
            <ul className="list-disc list-inside my-1 text-muted-foreground">
              {currentPoll.options.map(opt => (
                <li key={opt.id} className="text-xs">{opt.text} ({opt.votes} votes)</li>
              ))}
            </ul>
            <Button
              variant="destructive"
              size="sm"
              className="px-2 py-0.5 h-auto text-xs mt-1"
              onClick={handleDeletePoll}
            >
              <Trash2 className="mr-1 h-3 w-3" /> Delete Current Poll
            </Button>
          </div>
        )}
        {!isLoading && !currentPoll && (
          <p className="text-muted-foreground">No poll is currently active.</p>
        )}
      </div>

      {/* Create New Poll Section */}
      <div className="p-3 border border-form-input-border bg-form-background">
        <h3 className="text-base font-headline font-semibold text-poll-title-text mb-3">Create / Replace Poll</h3>
        <form onSubmit={handleCreatePoll} className="space-y-2">
          <div>
            <Label htmlFor="poll-question" className="block mb-0.5 text-form-label-text font-normal">Poll Question:</Label>
            <Input
              id="poll-question"
              value={newPollQuestion}
              onChange={(e) => setNewPollQuestion(e.target.value)}
              placeholder="e.g., What's your favorite color?"
              required
              className="bg-form-input-background border-form-input-border text-foreground h-7 px-2 py-1 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="poll-options" className="block mb-0.5 text-form-label-text font-normal">Poll Options (one per line):</Label>
            <Textarea
              id="poll-options"
              value={newPollOptions}
              onChange={(e) => setNewPollOptions(e.target.value)}
              placeholder="Red\nBlue\nGreen"
              required
              rows={3}
              className="bg-form-input-background border-form-input-border text-foreground p-1 text-xs min-h-[60px]"
            />
          </div>
          <div className="pt-1">
            <Button 
              type="submit"
              className="px-3 py-1 h-auto text-xs bg-form-button-background text-form-button-text border-form-button-border hover:bg-gray-300"
            >
              <PlusCircle className="mr-1 h-3.5 w-3.5" /> Create / Replace Poll
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
