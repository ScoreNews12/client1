// src/components/custom/TodaysPoll.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pollOptions = [
  { name: "Python", votes: 0 },
  { name: "JavaScript", votes: 0 },
  { name: "Rust", votes: 0 },
  { name: "Go", votes: 0 },
  { name: "C++", votes: 0 },
];

export default function TodaysPoll() {
  return (
    <div className="bg-poll-background p-3 md:p-4 my-2 border-t border-b border-gray-400">
      <h2 className="text-lg font-headline font-semibold text-poll-title-text mb-2">
        今日の投票 / Today's Poll: What's your favorite programming language?
      </h2>
      <div className="space-y-1">
        {pollOptions.map((option) => (
          <div
            key={option.name}
            className="bg-form-input-background p-2 border border-poll-option-border text-foreground text-xs"
          >
            {option.name} ({option.votes} votes)
          </div>
        ))}
      </div>
    </div>
  );
}
