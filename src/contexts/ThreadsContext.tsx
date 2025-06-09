
"use client";

import type { Thread, Comment } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { logUserDataAction } from '@/app/actions'; // Import the server action

interface ThreadsContextType {
  threads: Thread[];
  addThread: (threadData: Omit<Thread, 'id' | 'timestamp' | 'comments'>) => void;
  addComment: (threadId: string, commentData: Omit<Comment, 'id' | 'timestamp' | 'threadId'>) => void;
  getThreadById: (id: string) => Thread | undefined;
  deleteThread: (threadId: string) => void; 
  isLoading: boolean;
}

const ThreadsContext = createContext<ThreadsContextType | undefined>(undefined);

const initialThreads: Thread[] = []; 


export const ThreadsProvider = ({ children }: { children: ReactNode }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedThreads = localStorage.getItem('echoThreads');
    if (storedThreads) {
      try {
        setThreads(JSON.parse(storedThreads));
      } catch (error) {
        console.error("Failed to parse threads from localStorage", error);
        setThreads(initialThreads); 
      }
    } else {
      setThreads(initialThreads); 
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('echoThreads', JSON.stringify(threads));
    }
  }, [threads, isLoading]);

  const addThread = async (threadData: Omit<Thread, 'id' | 'timestamp' | 'comments'>) => {
    const newThread: Thread = {
      ...threadData,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      comments: [],
    };
    setThreads((prevThreads) => [newThread, ...prevThreads]);

    // Log user data using the server action
    try {
      await logUserDataAction(newThread.authorUsername, newThread.authorEmail, 'Posted Thread');
    } catch (error) {
      console.error("Error logging user data for new thread:", error);
    }
  };

  const addComment = async (threadId: string, commentData: Omit<Comment, 'id' | 'timestamp' | 'threadId'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
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

    // Log user data using the server action
    try {
      await logUserDataAction(newComment.authorUsername, newComment.authorEmail, 'Posted Comment');
    } catch (error) {
      console.error("Error logging user data for new comment:", error);
    }
  };

  const getThreadById = (id: string) => {
    return threads.find((thread) => thread.id === id);
  };

  const deleteThread = (threadId: string) => {
    setThreads((prevThreads) => prevThreads.filter(thread => thread.id !== threadId));
  };

  return (
    <ThreadsContext.Provider value={{ threads, addThread, addComment, getThreadById, deleteThread, isLoading }}>
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
