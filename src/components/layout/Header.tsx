
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquareText, Search } from 'lucide-react';

export default function AppHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
          <MessageSquareText className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">EchoThread</h1>
        </Link>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2 w-full max-w-md">
          <Input
            type="search"
            placeholder="Search threads..."
            className="flex-grow bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline" size="icon" className="bg-white hover:bg-neutral-100">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </form>

        <div className="flex items-center gap-3">
          {/* Auth-related UI removed */}
        </div>
      </div>
      <div className="md:hidden p-4 border-t border-border">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
          <Input
            type="search"
            placeholder="Search threads..."
            className="flex-grow bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline" size="icon" className="bg-white hover:bg-neutral-100">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
