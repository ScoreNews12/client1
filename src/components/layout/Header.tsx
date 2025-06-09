
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquareText, Search, LogIn, LogOut, UserPlus } from 'lucide-react';

export default function AppHeader() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50"> {/* Removed shadow-sm */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
          <MessageSquareText className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">EchoThread</h1>
        </Link>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2 w-full max-w-md">
          <Input
            type="search"
            placeholder="Search threads..."
            className="flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </form>

        <div className="flex items-center gap-3">
          {!isLoading && (
            user ? (
              <>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://placehold.co/40x40/E6E6FA/4B0082?text=${getInitials(user.username)}`} alt={user.username} data-ai-hint="avatar user" />
                  <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">{user.username}</span>
                <Button variant="ghost" size="icon" onClick={() => { logout(); router.push('/'); }} aria-label="Logout">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Link>
                </Button>
                 <Button variant="default" asChild>
                  <Link href="/login?mode=signup">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Link>
                </Button>
              </>
            )
          )}
        </div>
      </div>
      <div className="md:hidden p-4 border-t border-border">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
          <Input
            type="search"
            placeholder="Search threads..."
            className="flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
