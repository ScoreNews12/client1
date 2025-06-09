import type { Metadata } from 'next';
import { ThreadsProvider } from '@/contexts/ThreadsContext';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext'; // Import AdminAuthProvider
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/layout/Header';
import AppFooter from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'ヽ(´▽｀)ノ 匿名掲示板へようこそ！ ヽ(´▽｀)ノ',
  description: '～最強の掲示板サイト～ EXTREME TEXTBOARD EXPERIENCE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"> {/* Set language to Japanese */}
      <head>
        {/* Removed Google Fonts links */}
      </head>
      <body className="font-body text-foreground bg-background">
        <AdminAuthProvider> {/* Wrap ThreadsProvider with AdminAuthProvider */}
          <ThreadsProvider>
            <div className="flex flex-col min-h-screen">
              <AppHeader />
              <main className="flex-grow w-full">
                {children}
              </main>
              <AppFooter />
            </div>
            <Toaster />
          </ThreadsProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
