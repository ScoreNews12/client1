
"use client";

import { useSearchParams } from 'next/navigation';
import { useThreads } from '@/contexts/ThreadsContext';
import ThreadList from '@/components/threads/ThreadList';
import { useEffect, useState } from 'react';
import type { Thread } from '@/lib/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { threads, isLoading: threadsLoading } = useThreads();
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (!threadsLoading) {
      if (query) {
        const lowerCaseQuery = query.toLowerCase();
        const results = threads.filter(
          (thread) =>
            thread.title.toLowerCase().includes(lowerCaseQuery) ||
            thread.content.toLowerCase().includes(lowerCaseQuery) ||
            thread.authorUsername.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredThreads(results);
      } else {
        setFilteredThreads([]);
      }
      setIsLoading(false);
    }
  }, [query, threads, threadsLoading]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline">
        Search Results {query && `for "${query}"`}
      </h1>
      {isLoading ? (
        <ThreadList threads={[]} isLoading={true} />
      ) : filteredThreads.length > 0 ? (
        <ThreadList threads={filteredThreads} />
      ) : (
        <p className="text-muted-foreground text-center py-8">
          {query ? `No threads found matching your search for "${query}".` : "Please enter a search term to find threads."}
        </p>
      )}
    </div>
  );
}
