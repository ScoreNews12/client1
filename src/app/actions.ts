
'use server';

import fs from 'fs/promises';
import path from 'path';

const USER_DATA_FILE = path.join(process.cwd(), 'userdata.txt');

interface UserData {
  timestamp: string;
  username: string;
  email: string;
  action: 'Posted Thread' | 'Posted Comment';
}

/**
 * @fileOverview Server actions for the application.
 * - logUserDataAction - Appends user activity (username, email, action) to a local text file.
 */

/**
 * Appends user data to the userdata.txt file.
 * This is intended for local development logging. In a production serverless environment,
 * this file may not be writable or persistent.
 * @param username - The username of the poster.
 * @param email - The email of the poster.
 * @param actionType - The type of action ('Posted Thread' or 'Posted Comment').
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
    console.log('User data logged to userdata.txt:', logEntry);
  } catch (error) {
    console.error('Failed to write to userdata.txt:', error);
    // In a real app, you might want to handle this error more gracefully
    // or log it to a more robust monitoring system.
  }
}
