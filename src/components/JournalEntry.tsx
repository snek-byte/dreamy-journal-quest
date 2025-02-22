
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useJournal } from '@/lib/journal-context';
import { useToast } from '@/components/ui/use-toast';

export function JournalEntry() {
  const [content, setContent] = useState('');
  const { addEntry, incrementStreak } = useJournal();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addEntry({
      content,
      date: new Date().toISOString(),
      mood: 'neutral',
    });
    
    incrementStreak();
    setContent('');
    
    toast({
      title: "Entry saved!",
      description: "You earned 10 XP for your journal entry.",
    });
  };

  return (
    <Card className="p-6 glass-card animate-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Today's Journal</h2>
          <p className="text-sm text-muted-foreground">
            Write about your day, thoughts, or feelings...
          </p>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="min-h-[200px] resize-none focus:ring-2 focus:ring-primary/20"
        />

        <div className="flex justify-end">
          <Button 
            type="submit"
            className="transition-all hover:scale-105"
            disabled={!content.trim()}
          >
            Save Entry
          </Button>
        </div>
      </form>
    </Card>
  );
}
