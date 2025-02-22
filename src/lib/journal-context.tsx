
import React, { createContext, useContext, useState } from 'react';

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
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);

  const addEntry = (entry: Omit<JournalEntry, "id">) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    addXP(10); // Award XP for new entry
  };

  const addXP = (amount: number) => {
    setXP((prev) => prev + amount);
  };

  const incrementStreak = () => {
    setStreak((prev) => prev + 1);
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
