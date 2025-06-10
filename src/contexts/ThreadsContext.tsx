
"use client";

import type { Thread, Comment } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { 
  fetchThreadsAction,
  postNewThreadAction,
  postNewCommentAction,
  deleteThreadAction,
  deleteCommentAction 
} from '@/app/actions';

interface ThreadsContextType {
  threads: Thread[];
  addThread: (threadData: Omit<Thread, 'id' | 'timestamp' | 'comments'>) => Promise<void>;
  addComment: (threadId: string, commentData: Omit<Comment, 'id' | 'timestamp' | 'threadId'>) => Promise<void>;
  getThreadById: (id: string) => Thread | undefined;
  deleteThread: (threadId: string) => Promise<void>; 
  deleteComment: (threadId: string, commentId: string) => Promise<void>;
  isLoading: boolean;
  refreshThreads: () => Promise<void>;
}

const ThreadsContext = createContext<ThreadsContextType | undefined>(undefined);

export const ThreadsProvider = ({ children }: { children: ReactNode }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshThreads = useCallback(async () => {
    setIsLoading(true);
    try {
      const serverThreads = await fetchThreadsAction();
      setThreads(serverThreads);
    } catch (error) {
      console.error("Failed to fetch threads from server:", error);
      setThreads([]); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshThreads();
  }, [refreshThreads]);

  const addThread = async (threadData: Omit<Thread, 'id' | 'timestamp' | 'comments'>) => {
    try {
      const newThread = await postNewThreadAction(threadData);
      setThreads((prevThreads) => [newThread, ...prevThreads]);
    } catch (error) {
      console.error("Error posting new thread:", error);
    }
  };

  const addComment = async (threadId: string, commentData: Omit<Comment, 'id' | 'timestamp' | 'threadId'>) => {
    try {
      const newComment = await postNewCommentAction(threadId, commentData);
      if (newComment) {
        setThreads((prevThreads) =>
          prevThreads.map((thread) =>
            thread.id === threadId
              ? { ...thread, comments: [newComment, ...thread.comments] }
              : thread
          )
        );
      }
    } catch (error) {
      console.error("Error posting new comment:", error);
    }
  };

  const getThreadById = (id: string) => {
    return threads.find((thread) => thread.id === id);
  };

  const deleteThread = async (threadId: string) => {
    try {
      await deleteThreadAction(threadId);
      setThreads((prevThreads) => prevThreads.filter(thread => thread.id !== threadId));
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };

  const deleteComment = async (threadId: string, commentId: string) => {
    try {
      const success = await deleteCommentAction(threadId, commentId);
      if (success) {
        setThreads((prevThreads) =>
          prevThreads.map((thread) =>
            thread.id === threadId
              ? { ...thread, comments: thread.comments.filter(c => c.id !== commentId) }
              : thread
          )
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <ThreadsContext.Provider value={{ threads, addThread, addComment, getThreadById, deleteThread, deleteComment, isLoading, refreshThreads }}>
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
