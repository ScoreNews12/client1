
"use client";

import type { AdminCredentials } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AdminCredentials) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_USERNAME = "Tom";
const ADMIN_PASSWORD = "TOMSMART";
const ADMIN_AUTH_KEY = "echoAdminAuth";

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To prevent flash of unauth content
  const { toast } = useToast();

  useEffect(() => {
    const storedAuth = localStorage.getItem(ADMIN_AUTH_KEY);
    if (storedAuth === "true") {
      setIsAdminAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (credentials: AdminCredentials): boolean => {
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      toast({ title: "Admin Login Successful", description: "Welcome, Tom!" });
      return true;
    }
    toast({ title: "Admin Login Failed", description: "Invalid username or password.", variant: "destructive" });
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
    toast({ title: "Admin Logout Successful" });
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
