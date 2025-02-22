
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ThemeSettings } from "./ThemeSettings";
import { useJournal } from "@/lib/journal-context";

export function SettingsDialog() {
  const { xp, streak } = useJournal();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <ThemeSettings />
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Progress</h4>
            <div className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total XP:</span>
                <span className="font-medium">{xp}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Streak:</span>
                <span className="font-medium">{streak} days</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
