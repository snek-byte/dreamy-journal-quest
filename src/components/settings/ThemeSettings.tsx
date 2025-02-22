
import { Moon, Sun, Type } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

const fonts = [
  { name: "Inter", class: "font-sans" },
  { name: "Playfair Display", class: "font-playfair" },
  { name: "Lora", class: "font-lora" },
];

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentFont, setCurrentFont] = useState("Inter");

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleFontChange = (fontName: string) => {
    setCurrentFont(fontName);
    document.documentElement.className = `${theme === 'dark' ? 'dark' : ''} ${
      fonts.find(f => f.name === fontName)?.class || 'font-sans'
    }`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Theme</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Font</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Type className="h-4 w-4" />
              {currentFont}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {fonts.map((font) => (
              <DropdownMenuItem
                key={font.name}
                onClick={() => handleFontChange(font.name)}
                className={font.class}
              >
                {font.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
