
import React from 'react';
import { BookOpen, Settings } from 'lucide-react';
import { useJournal } from '@/lib/journal-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Theme</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
