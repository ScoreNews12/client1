import type { Metadata } from 'next';
import { ThreadsProvider } from '@/contexts/ThreadsContext';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/layout/Header';
import AppFooter from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'EchoThread - Share Your Voice',
  description: 'A community platform for posting and discussing threads.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Removed Google Fonts links */}
      </head>
      <body className="font-body antialiased">
        <ThreadsProvider>
          <div className="flex flex-col min-h-screen">
            <AppHeader />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <AppFooter />
          </div>
          <Toaster />
        </ThreadsProvider>
      </body>
    </html>
  );
}
