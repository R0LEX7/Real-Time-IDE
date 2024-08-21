"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [mode, setMode] = useState<string>("light");
  const { setTheme } = useTheme();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme !== null) {
      setMode(theme);
    }
  }, []);

  const handleMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    setMode(nextMode);
    setTheme(nextMode);
    localStorage.setItem("theme", nextMode); // Update the theme in local storage
  };

  return (
    <div>
      <Switch id="theme" onClick={handleMode} />
      <Label htmlFor="theme">{mode}</Label>
    </div>
  );
}
