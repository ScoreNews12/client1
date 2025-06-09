
"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login({ username, password })) {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 md:p-6 bg-form-background border border-form-input-border">
      <h2 className="text-xl font-headline font-bold text-center text-poll-title-text mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <Label htmlFor="admin-username" className="block mb-1 text-form-label-text font-normal">Username:</Label>
          <Input
            id="admin-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-form-input-background border-form-input-border text-foreground h-8 px-2 py-1 text-sm"
          />
        </div>
        <div>
          <Label htmlFor="admin-password" className="block mb-1 text-form-label-text font-normal">Password:</Label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-form-input-background border-form-input-border text-foreground h-8 px-2 py-1 text-sm"
          />
        </div>
        <div className="pt-2">
          <Button 
            type="submit"
            className="w-full px-4 py-1.5 h-auto bg-form-button-background border border-form-button-border text-sm text-form-button-text hover:bg-gray-300 focus:ring-0"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
