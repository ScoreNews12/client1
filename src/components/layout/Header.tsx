
"use client";

import Link from 'next/link';
import { MessageSquareText } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
          <MessageSquareText className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">EchoThread</h1>
        </Link>

        <div className="flex items-center gap-3">
          {/* Auth-related UI removed, Search UI removed */}
        </div>
      </div>
      {/* Mobile search form removed */}
    </header>
  );
}
