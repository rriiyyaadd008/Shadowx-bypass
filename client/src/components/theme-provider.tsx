import { createContext, useContext, useEffect, useState } from "react";

type Theme = "red" | "blue";

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("red");

  useEffect(() => {
    const stored = localStorage.getItem("shadowx-theme") as Theme;
    if (stored && (stored === "red" || stored === "blue")) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shadowx-theme", theme);
    
    // Apply theme classes to document
    const root = document.documentElement;
    root.classList.remove("theme-red", "theme-blue");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "red" ? "blue" : "red");
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
