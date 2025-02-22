
import { Moon, Sun, Type } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const fonts = [
  { name: "Inter", class: "font-sans" },
  { name: "Playfair Display", class: "font-playfair" },
  { name: "Lora", class: "font-lora" },
];

export function ThemeSettings() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentFont, setCurrentFont] = useState(() => 
    localStorage.getItem('preferred-font') || "Inter"
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize font on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('preferred-font') || "Inter";
    const fontClass = fonts.find(f => f.name === savedFont)?.class || 'font-sans';
    document.documentElement.classList.remove(...fonts.map(f => f.class));
    document.documentElement.classList.add(fontClass);
    setCurrentFont(savedFont);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme switched to ${newTheme} mode`,
    });
  };

  const handleFontChange = (fontName: string) => {
    const fontClass = fonts.find(f => f.name === fontName)?.class || 'font-sans';
    
    // Remove all font classes first
    document.documentElement.classList.remove(...fonts.map(f => f.class));
    
    // Add the new font class
    document.documentElement.classList.add(fontClass);
    
    // Save the preference
    localStorage.setItem('preferred-font', fontName);
    setCurrentFont(fontName);
    
    toast({
      title: "Font updated",
      description: `Font changed to ${fontName}`,
    });
  };

  if (!mounted) {
    return null;
  }

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
            <DropdownMenuItem onClick={() => handleThemeChange("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("system")}>
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
