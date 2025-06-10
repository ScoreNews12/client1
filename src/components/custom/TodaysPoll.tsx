
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Poll, PollOption } from '@/lib/types';
import { fetchPollAction, votePollAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const USER_VOTED_POLL_KEY_PREFIX = 'userVotedPoll_'; // To store which option user voted for per poll

export default function TodaysPoll() {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [userVotedOptionId, setUserVotedOptionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadPollData = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedPoll = await fetchPollAction();
      setPoll(fetchedPoll);
      if (fetchedPoll) {
        const storedUserVote = localStorage.getItem(USER_VOTED_POLL_KEY_PREFIX + fetchedPoll.id);
        if (storedUserVote) {
          setUserVotedOptionId(storedUserVote);
        } else {
          setUserVotedOptionId(null); // Reset if new poll or no vote stored
        }
      } else {
        setUserVotedOptionId(null); // No poll, no vote
      }
    } catch (error) {
      console.error("Failed to fetch poll data:", error);
      toast({ title: "Error", description: "Could not load today's poll.", variant: "destructive" });
      setPoll(null);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadPollData();
  }, [loadPollData]);

  const handleVote = async (optionId: string) => {
    if (!poll || userVotedOptionId) return; 

    try {
      const updatedPoll = await votePollAction(optionId);
      if (updatedPoll) {
        setPoll(updatedPoll);
        setUserVotedOptionId(optionId);
        localStorage.setItem(USER_VOTED_POLL_KEY_PREFIX + poll.id, optionId);
        toast({ title: "Vote Cast!", description: "Your vote has been recorded." });
      } else {
        throw new Error("Poll update failed");
      }
    } catch (error) {
      console.error("Failed to cast vote:", error);
      toast({ title: "Error", description: "Could not cast your vote.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-poll-background p-3 md:p-4 my-2 border-t border-b border-gray-400">
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300" />
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-8 w-full bg-gray-300" />
          ))}
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="bg-poll-background p-3 md:p-4 my-2 border-t border-b border-gray-400">
        <h2 className="text-lg font-headline font-semibold text-poll-title-text mb-2">
          今日の投票 / Today's Poll
        </h2>
        <p className="text-sm text-center text-muted-foreground">No poll active currently.</p>
      </div>
    );
  }
  
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="bg-poll-background p-3 md:p-4 my-2 border-t border-b border-gray-400">
      <h2 className="text-lg font-headline font-semibold text-poll-title-text mb-2">
        今日の投票 / Today's Poll: {poll.question}
      </h2>
      <div className="space-y-1 text-xs">
        {poll.options.map((option) => {
          const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : "0.0";
          return (
            <Button
              key={option.id}
              variant="outline"
              className={`w-full justify-start h-auto py-1.5 px-2 text-left bg-form-input-background border-poll-option-border text-foreground hover:bg-gray-200 
                          ${userVotedOptionId ? 'cursor-not-allowed opacity-75' : ''}
                          ${userVotedOptionId === option.id ? 'ring-2 ring-primary ring-offset-1' : ''}`}
              onClick={() => handleVote(option.id)}
              disabled={!!userVotedOptionId}
              aria-pressed={userVotedOptionId === option.id}
            >
              <div className="flex justify-between items-center w-full">
                <span>{option.text}</span>
                {userVotedOptionId || totalVotes > 0 ? ( // Show votes if anyone voted or user has voted
                  <span className="text-muted-foreground">{option.votes} votes ({percentage}%)</span>
                ) : (
                  <span className="text-muted-foreground">{option.votes} votes</span>
                )}
              </div>
            </Button>
          );
        })}
      </div>
      {userVotedOptionId && (
        <p className="text-xs text-center mt-2 text-muted-foreground">
          You voted for: <span className="font-semibold text-primary">{poll.options.find(o => o.id === userVotedOptionId)?.text}</span>. Total Votes: {totalVotes}.
        </p>
      )}
      {!userVotedOptionId && totalVotes > 0 && (
         <p className="text-xs text-center mt-2 text-muted-foreground">Total Votes: {totalVotes}.</p>
      )}
    </div>
  );
}
