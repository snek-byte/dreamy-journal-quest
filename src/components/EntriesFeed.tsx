
import React from 'react';
import { useJournal } from '@/lib/journal-context';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function EntriesFeed() {
  const { entries } = useJournal();

  if (entries.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground animate-in">
        No entries yet. Start journaling to see your entries here!
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-full rounded-lg">
      <div className="space-y-4 p-4">
        {entries.map((entry) => (
          <Card 
            key={entry.id} 
            className="p-4 hover:shadow-lg transition-shadow animate-in"
          >
            <time className="text-sm text-muted-foreground">
              {new Date(entry.date).toLocaleDateString()}
            </time>
            <p className="mt-2 whitespace-pre-wrap">{entry.content}</p>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
