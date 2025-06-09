export type User = {
  id: string;
  email: string;
  username: string;
};

export type Comment = {
  id: string;
  threadId: string;
  authorEmail: string; // Required for creation
  authorUsername: string; // Required for creation
  content: string;
  timestamp: string; // ISO string for easier serialization
};

export type Thread = {
  id: string;
  authorEmail: string; // Required for creation
  authorUsername: string; // Required for creation
  title: string; 
  content: string;
  timestamp: string; // ISO string for easier serialization
  comments: Comment[];
};

// Admin types (can be expanded later if needed)
export type AdminCredentials = {
  username: string;
  password?: string; // Password is used for login, not stored long-term
};
