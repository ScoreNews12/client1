
// src/components/custom/TodaysPoll.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Using Button for better styling and accessibility
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

interface PollOption {
  name: string;
  votes: number;
}

const INITIAL_POLL_OPTIONS: PollOption[] = [
  { name: "Python", votes: 0 },
  { name: "JavaScript", votes: 0 },
  { name: "Rust", votes: 0 },
  { name: "Go", votes: 0 },
  { name: "C++", votes: 0 },
];

const POLL_DATA_KEY = 'todaysPollData_v2'; // Changed key to reset if structure changed
const USER_VOTED_KEY = 'todaysPollUserVotedOption_v2';

export default function TodaysPoll() {
  const [pollOptions, setPollOptions] = useState<PollOption[]>(INITIAL_POLL_OPTIONS);
  const [userVotedOption, setUserVotedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load poll data from localStorage
    const storedPollData = localStorage.getItem(POLL_DATA_KEY);
    if (storedPollData) {
      try {
        const parsedData = JSON.parse(storedPollData);
        // Basic validation to ensure it's an array and items have name/votes
        if (Array.isArray(parsedData) && parsedData.every(opt => typeof opt.name === 'string' && typeof opt.votes === 'number')) {
          setPollOptions(parsedData);
        } else {
          // If data is malformed, reset to initial and save
          localStorage.setItem(POLL_DATA_KEY, JSON.stringify(INITIAL_POLL_OPTIONS));
          setPollOptions(INITIAL_POLL_OPTIONS);
        }
      } catch (error) {
        console.error("Failed to parse poll data from localStorage", error);
        localStorage.setItem(POLL_DATA_KEY, JSON.stringify(INITIAL_POLL_OPTIONS));
        setPollOptions(INITIAL_POLL_OPTIONS);
      }
    } else {
      // Initialize if no data found
      localStorage.setItem(POLL_DATA_KEY, JSON.stringify(INITIAL_POLL_OPTIONS));
    }

    // Load user's vote status
    const storedUserVote = localStorage.getItem(USER_VOTED_KEY);
    if (storedUserVote) {
      setUserVotedOption(storedUserVote);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Save poll data to localStorage when it changes, but not during initial load
    if (!isLoading) {
      localStorage.setItem(POLL_DATA_KEY, JSON.stringify(pollOptions));
    }
  }, [pollOptions, isLoading]);

  useEffect(() => {
    // Save user's vote to localStorage when it changes, but not during initial load
    if (!isLoading && userVotedOption !== null) {
      localStorage.setItem(USER_VOTED_KEY, userVotedOption);
    }
  }, [userVotedOption, isLoading]);

  const handleVote = (optionName: string) => {
    if (userVotedOption) return; // User has already voted

    setPollOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.name === optionName ? { ...option, votes: option.votes + 1 } : option
      )
    );
    setUserVotedOption(optionName);
  };

  if (isLoading) {
    return (
      <div className="bg-poll-background p-3 md:p-4 my-2 border-t border-b border-gray-400">
        <h2 className="text-lg font-headline font-semibold text-poll-title-text mb-2">
          今日の投票 / Today's Poll: What's your favorite programming language?
        </h2>
        <div className="space-y-1">
          {INITIAL_POLL_OPTIONS.map((option) => (
            <Skeleton key={option.name} className="h-8 w-full bg-gray-300" />
          ))}
        </div>
      </div>
    );
  }
  
  const totalVotes = pollOptions.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="bg-poll-background p-3 md:p-4 my-2 border-t border-b border-gray-400">
      <h2 className="text-lg font-headline font-semibold text-poll-title-text mb-2">
        今日の投票 / Today's Poll: What's your favorite programming language?
      </h2>
      <div className="space-y-1 text-xs">
        {pollOptions.map((option) => {
          const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : "0.0";
          return (
            <Button
              key={option.name}
              variant="outline"
              className={`w-full justify-start h-auto py-1.5 px-2 text-left bg-form-input-background border-poll-option-border text-foreground hover:bg-gray-200 
                          ${userVotedOption ? 'cursor-not-allowed opacity-75' : ''}
                          ${userVotedOption === option.name ? 'ring-2 ring-primary ring-offset-1' : ''}`}
              onClick={() => handleVote(option.name)}
              disabled={!!userVotedOption}
            >
              <div className="flex justify-between items-center w-full">
                <span>{option.name}</span>
                {userVotedOption ? (
                  <span className="text-muted-foreground">{option.votes} votes ({percentage}%)</span>
                ) : (
                  <span className="text-muted-foreground">{option.votes} votes</span>
                )}
              </div>
            </Button>
          );
        })}
      </div>
      {userVotedOption && (
        <p className="text-xs text-center mt-2 text-muted-foreground">
          You voted for: <span className="font-semibold text-primary">{userVotedOption}</span>. Total Votes: {totalVotes}.
        </p>
      )}
    </div>
  );
}
