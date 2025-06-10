
'use server';

import fs from 'fs/promises';
import path from 'path';
import type { Thread, Comment, Poll, PollOption } from '@/lib/types';

const USER_DATA_FILE = path.join(process.cwd(), 'userdata.txt');
const THREADS_DATA_FILE = path.join(process.cwd(), 'threads.json');
const POLL_DATA_FILE = path.join(process.cwd(), 'poll.json');

interface UserData {
  timestamp: string;
  username: string;
  email: string;
  action: 'Posted Thread' | 'Posted Comment';
}

/**
 * @fileOverview Server actions for the application.
 * - logUserDataAction - Appends user activity to a local text file.
 * - fetchThreadsAction - Fetches all threads from threads.json.
 * - postNewThreadAction - Creates a new thread and saves it.
 * - postNewCommentAction - Adds a comment to a thread and saves it.
 * - deleteThreadAction - Deletes a thread.
 * - deleteCommentAction - Deletes a comment from a thread.
 * - fetchPollAction - Fetches the current poll from poll.json.
 * - votePollAction - Records a vote for a poll option.
 * - createPollAction - Creates or replaces the current poll.
 * - deletePollAction - Deletes the current poll.
 */

export async function logUserDataAction(
  username: string,
  email: string,
  actionType: 'Posted Thread' | 'Posted Comment'
): Promise<void> {
  const timestamp = new Date().toISOString();
  const logEntry: UserData = {
    timestamp,
    username,
    email,
    action: actionType,
  };
  const logString = `Timestamp: ${logEntry.timestamp}, Username: ${logEntry.username}, Email: ${logEntry.email}, Action: ${logEntry.action}\n`;

  try {
    await fs.appendFile(USER_DATA_FILE, logString);
  } catch (error) {
    console.error('Failed to write to userdata.txt:', error);
  }
}

async function getThreadsFromFile(): Promise<Thread[]> {
  try {
    const fileContent = await fs.readFile(THREADS_DATA_FILE, 'utf-8');
    if (!fileContent) return [];
    return JSON.parse(fileContent) as Thread[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(THREADS_DATA_FILE, JSON.stringify([], null, 2), 'utf-8'); // Create file if not exists
      return []; 
    }
    console.error('Error reading threads.json:', error);
    throw error; // Re-throw to be caught by calling action
  }
}

async function saveThreadsToFile(threads: Thread[]): Promise<void> {
  try {
    await fs.writeFile(THREADS_DATA_FILE, JSON.stringify(threads, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to threads.json:', error);
    throw error; // Re-throw to be caught by calling action
  }
}

export async function fetchThreadsAction(): Promise<Thread[]> {
  try {
    return await getThreadsFromFile();
  } catch (error) {
    console.error('fetchThreadsAction failed:', error);
    return []; // Return empty array on error
  }
}

export async function postNewThreadAction(
  threadData: Omit<Thread, 'id' | 'timestamp' | 'comments'>
): Promise<Thread | null> { // Return null on failure
  try {
    const newThread: Thread = {
      ...threadData,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      comments: [],
    };

    await logUserDataAction(newThread.authorUsername, newThread.authorEmail, 'Posted Thread');

    const threads = await getThreadsFromFile();
    threads.unshift(newThread);
    await saveThreadsToFile(threads);
    return newThread;
  } catch (error) {
    console.error('Error in postNewThreadAction:', error);
    return null;
  }
}

export async function postNewCommentAction(
  threadId: string,
  commentData: Omit<Comment, 'id' | 'timestamp' | 'threadId'>
): Promise<Comment | null> {
  try {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      threadId,
    };

    await logUserDataAction(newComment.authorUsername, newComment.authorEmail, 'Posted Comment');

    const threads = await getThreadsFromFile();
    const threadIndex = threads.findIndex(t => t.id === threadId);

    if (threadIndex === -1) {
      console.error(`Thread with id ${threadId} not found for adding comment.`);
      return null;
    }

    threads[threadIndex].comments.unshift(newComment);
    await saveThreadsToFile(threads);
    return newComment;
  } catch (error) {
    console.error('Error in postNewCommentAction:', error);
    return null;
  }
}

export async function deleteThreadAction(threadId: string): Promise<boolean> {
  try {
    let threads = await getThreadsFromFile();
    const originalLength = threads.length;
    threads = threads.filter(thread => thread.id !== threadId);
    
    if (threads.length === originalLength) {
      console.warn(`Thread with id ${threadId} not found for deletion or no change made.`);
      return false; 
    }

    await saveThreadsToFile(threads);
    return true; 
  } catch (error) {
    console.error(`Error in deleteThreadAction for threadId ${threadId}:`, error);
    return false; 
  }
}

export async function deleteCommentAction(threadId: string, commentId: string): Promise<boolean> {
  try {
    let threads = await getThreadsFromFile();
    const threadIndex = threads.findIndex(t => t.id === threadId);

    if (threadIndex === -1) {
      console.warn(`Thread with id ${threadId} not found for deleting comment.`);
      return false;
    }

    const originalCommentCount = threads[threadIndex].comments.length;
    threads[threadIndex].comments = threads[threadIndex].comments.filter(c => c.id !== commentId);
    
    if (threads[threadIndex].comments.length === originalCommentCount) {
      console.warn(`Comment with id ${commentId} not found in thread ${threadId} or no change made.`);
      return false; 
    }

    await saveThreadsToFile(threads);
    return true; 
  } catch (error) {
    console.error(`Error in deleteCommentAction for threadId ${threadId}, commentId ${commentId}:`, error);
    return false;
  }
}

// --- Poll Actions ---

async function getPollFromFile(): Promise<Poll | null> {
  try {
    const fileContent = await fs.readFile(POLL_DATA_FILE, 'utf-8');
    if (!fileContent.trim()) return null; 
    return JSON.parse(fileContent) as Poll;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(POLL_DATA_FILE, JSON.stringify(null, null, 2), 'utf-8');
      return null;
    }
    console.error('Error reading poll.json:', error);
    throw error; // Let calling action handle
  }
}

async function savePollToFile(poll: Poll | null): Promise<void> {
  try {
    await fs.writeFile(POLL_DATA_FILE, JSON.stringify(poll, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to poll.json:', error);
    throw error; // Let calling action handle
  }
}

export async function fetchPollAction(): Promise<Poll | null> {
  try {
    return await getPollFromFile();
  } catch (error) {
    console.error('fetchPollAction failed:', error);
    return null;
  }
}

export async function votePollAction(optionId: string): Promise<Poll | null> {
  try {
    const poll = await getPollFromFile();
    if (!poll) {
      console.error('No active poll to vote on.');
      return null;
    }

    const optionIndex = poll.options.findIndex(opt => opt.id === optionId);
    if (optionIndex === -1) {
      console.error(`Option with id ${optionId} not found in poll ${poll.id}.`);
      return poll; 
    }

    poll.options[optionIndex].votes += 1;
    await savePollToFile(poll);
    return poll;
  } catch (error) {
    console.error('Error in votePollAction:', error);
    const currentPoll = await getPollFromFile().catch(() => null); // Attempt to return current state on error
    return currentPoll;
  }
}

export async function createPollAction(question: string, optionTexts: string[]): Promise<Poll | null> {
  try {
    if (!question.trim() || optionTexts.some(opt => !opt.trim()) || optionTexts.length < 2) {
      console.error("Poll question and at least two options are required for creation.");
      return null; // Return null instead of throwing for client to handle
    }
    const newPoll: Poll = {
      id: `poll-${Date.now().toString()}-${Math.random().toString(36).substring(2,7)}`, // Added randomness
      question,
      options: optionTexts.map((text, index) => ({
        id: `opt-${index}-${Date.now().toString()}-${Math.random().toString(36).substring(2,7)}`, // Added randomness
        text,
        votes: 0,
      })),
      createdAt: new Date().toISOString(),
    };
    await savePollToFile(newPoll);
    return newPoll;
  } catch (error) {
    console.error('Error in createPollAction:', error);
    return null;
  }
}

export async function deletePollAction(): Promise<boolean> {
  try {
    await savePollToFile(null); 
    return true;
  } catch (error) {
    console.error('Error in deletePollAction:', error);
    return false;
  }
}
