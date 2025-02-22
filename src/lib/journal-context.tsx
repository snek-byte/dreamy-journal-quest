
import React, { createContext, useContext, useState, useEffect } from 'react';

type JournalEntry = {
  id: string;
  content: string;
  date: string;
  mood?: string;
};

type JournalContextType = {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, "id">) => void;
  xp: number;
  addXP: (amount: number) => void;
  streak: number;
  incrementStreak: () => void;
  level: number;
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

const calculateLevel = (xp: number) => {
  return Math.floor(xp / 100) + 1;
};

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const savedEntries = localStorage.getItem('journal_entries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  
  const [xp, setXP] = useState(() => {
    const savedXP = localStorage.getItem('journal_xp');
    return savedXP ? parseInt(savedXP, 10) : 0;
  });
  
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('journal_streak');
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });

  const level = calculateLevel(xp);

  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('journal_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('journal_streak', streak.toString());
  }, [streak]);

  const addEntry = (entry: Omit<JournalEntry, "id">) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    addXP(10); // Base XP for new entry
    
    // Bonus XP for longer entries
    if (entry.content.length > 200) {
      addXP(5);
    }
    
    // Check and update streak
    const lastEntry = entries[0];
    if (lastEntry) {
      const lastEntryDate = new Date(lastEntry.date).toDateString();
      const today = new Date().toDateString();
      if (lastEntryDate !== today) {
        incrementStreak();
      }
    } else {
      incrementStreak();
    }
  };

  const addXP = (amount: number) => {
    setXP((prev) => {
      const newXP = prev + amount;
      const newLevel = calculateLevel(newXP);
      const oldLevel = calculateLevel(prev);
      
      if (newLevel > oldLevel) {
        // Level up!
        toast({
          title: "Level Up!",
          description: `You've reached level ${newLevel}!`,
        });
      }
      
      return newXP;
    });
  };

  const incrementStreak = () => {
    setStreak((prev) => {
      const newStreak = prev + 1;
      // Add bonus XP for streak milestones
      if (newStreak % 7 === 0) {
        addXP(50); // Weekly streak bonus
        toast({
          title: "Weekly Streak!",
          description: "You've earned a 50 XP bonus for maintaining a weekly streak!",
        });
      }
      return newStreak;
    });
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        addEntry,
        xp,
        addXP,
        streak,
        incrementStreak,
        level,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
