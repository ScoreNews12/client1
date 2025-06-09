
"use client";

import type { Thread, Comment } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThreadsContextType {
  threads: Thread[];
  addThread: (threadData: Omit<Thread, 'id' | 'timestamp' | 'comments'>) => void;
  addComment: (threadId: string, commentData: Omit<Comment, 'id' | 'timestamp' | 'threadId'>) => void;
  getThreadById: (id: string) => Thread | undefined;
  isLoading: boolean;
}

const ThreadsContext = createContext<ThreadsContextType | undefined>(undefined);

const initialThreads: Thread[] = [
  {
    id: '1',
    title: 'Welcome to EchoThread!',
    authorEmail: 'admin@echothread.com',
    authorUsername: 'Admin',
    content: 'This is the first thread. Feel free to post and comment!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    comments: [
      { 
        id: 'c1', 
        threadId: '1', 
        authorEmail: 'user1@example.com', 
        authorUsername: 'UserOne', 
        content: 'Great platform!', 
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
      },
    ],
  },
  {
    id: '2',
    title: 'Share Your Thoughts on Next.js 15',
    authorEmail: 'dev@echothread.com',
    authorUsername: 'DevGal',
    content: 'What are your favorite new features in Next.js 15? I am loving the improved server components.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    comments: [],
  },
];


export const ThreadsProvider = ({ children }: { children: ReactNode }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading threads from storage or API
    const storedThreads = localStorage.getItem('echoThreads');
    if (storedThreads) {
      setThreads(JSON.parse(storedThreads));
    } else {
      setThreads(initialThreads); // Load initial if nothing in storage
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Persist threads to localStorage whenever they change
    // This is only for client-side demo, not for production
    if (!isLoading) {
      localStorage.setItem('echoThreads', JSON.stringify(threads));
    }
  }, [threads, isLoading]);

  const addThread = (threadData: Omit<Thread, 'id' | 'timestamp' | 'comments'>) => {
    const newThread: Thread = {
      ...threadData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      comments: [],
    };
    setThreads((prevThreads) => [newThread, ...prevThreads]);
  };

  const addComment = (threadId: string, commentData: Omit<Comment, 'id' | 'timestamp' | 'threadId'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      threadId,
    };
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? { ...thread, comments: [newComment, ...thread.comments] }
          : thread
      )
    );
  };

  const getThreadById = (id: string) => {
    return threads.find((thread) => thread.id === id);
  };

  return (
    <ThreadsContext.Provider value={{ threads, addThread, addComment, getThreadById, isLoading }}>
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreads = () => {
  const context = useContext(ThreadsContext);
  if (context === undefined) {
    throw new Error('useThreads must be used within a ThreadsProvider');
  }
  return context;
};
