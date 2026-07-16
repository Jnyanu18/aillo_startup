import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "ailo-theme";

function getInitial(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem(STORAGE_KEY) as "dark" | "light") || "dark";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const initial = getInitial();
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  };

  return (
    <button
      aria-label="Toggle color theme"
      onClick={toggle}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/50 text-foreground transition-colors hover:bg-surface ${className}`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
