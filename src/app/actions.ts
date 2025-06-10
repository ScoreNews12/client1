
'use server';

import fs from 'fs/promises';
import path from 'path';
import type { Thread, Comment } from '@/lib/types';

const USER_DATA_FILE = path.join(process.cwd(), 'userdata.txt');
const THREADS_DATA_FILE = path.join(process.cwd(), 'threads.json');

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
 */

/**
 * Appends user data to the userdata.txt file.
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
    // console.log('User data logged to userdata.txt:', logEntry);
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
      return []; // File doesn't exist, return empty array
    }
    console.error('Error reading threads.json:', error);
    return []; // Return empty array on other errors to prevent crashes
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
  return await getThreadsFromFile();
}

export async function postNewThreadAction(
  threadData: Omit<Thread, 'id' | 'timestamp' | 'comments'>
): Promise<Thread> {
  const newThread: Thread = {
    ...threadData,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString(),
    comments: [],
  };

  await logUserDataAction(newThread.authorUsername, newThread.authorEmail, 'Posted Thread');

  const threads = await getThreadsFromFile();
  threads.unshift(newThread); // Add to the beginning
  await saveThreadsToFile(threads);
  return newThread;
}

export async function postNewCommentAction(
  threadId: string,
  commentData: Omit<Comment, 'id' | 'timestamp' | 'threadId'>
): Promise<Comment | null> {
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
    return null; // Or throw an error
  }

  threads[threadIndex].comments.unshift(newComment); // Add to the beginning
  await saveThreadsToFile(threads);
  return newComment;
}

export async function deleteThreadAction(threadId: string): Promise<void> {
  let threads = await getThreadsFromFile();
  threads = threads.filter(thread => thread.id !== threadId);
  await saveThreadsToFile(threads);
}
