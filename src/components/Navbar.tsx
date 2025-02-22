
import React from 'react';
import { BookOpen } from 'lucide-react';
import { useJournal } from '@/lib/journal-context';
import { SettingsDialog } from './settings/SettingsDialog';

export function Navbar() {
  const { xp, streak } = useJournal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <span className="font-semibold">Mindful Journal</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="font-medium">XP: </span>
              <span className="text-muted-foreground">{xp}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Streak: </span>
              <span className="text-muted-foreground">{streak} days</span>
            </div>
          </div>
          
          <SettingsDialog />
        </div>
      </div>
    </nav>
  );
}
