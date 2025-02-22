
import React from 'react';
import { JournalProvider } from '@/lib/journal-context';
import { Navbar } from '@/components/Navbar';
import { JournalEntry } from '@/components/JournalEntry';
import { EntriesFeed } from '@/components/EntriesFeed';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <JournalProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container py-20 space-y-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <JournalEntry />
            <EntriesFeed />
          </div>
        </main>
        
        <Toaster />
      </div>
    </JournalProvider>
  );
};

export default Index;
