import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { VscRunAll } from "react-icons/vsc";
import { GoTrash } from "react-icons/go";
import { useCodeStore } from '@/store/store';
import toast from 'react-hot-toast';

const languages: { language: string; id: string }[] = [
  { language: "C", id: "c" },
  { language: "C++", id: "cpp" },
  { language: "C#", id: "csharp" },
  { language: "CSS", id: "css" },
  { language: "Go", id: "go" },
  { language: "HTML", id: "html" },
  { language: "Java", id: "java" },
  { language: "Javascript", id: "javascript" },
  { language: "Kotlin", id: "kotlin" },
  { language: "Python", id: "python" },
  { language: "TypeScript", id: "typescript" },
];

type Props = {
  handleTheme: (theme: string) => void;
  theme: string;
};

export default function CodeBar({ handleTheme, theme }: Props) {
  const setLanguage = useCodeStore((state) => state.changeLanguage);
  const language = useCodeStore((state) => state.language);

  const handleLanguageChange = (lang: string) => {
    const selectedLanguage = languages.find(l => l.language === lang)?.id || "javascript";
    setLanguage(selectedLanguage);
    toast.success(`${selectedLanguage} Selected`);
  };



  return (
    <div className="mb-3 flex justify-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{language}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {languages.map((language) => (
            <DropdownMenuItem key={language.id} onClick={() => handleLanguageChange(language.language)}>
              {language.language}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon" onClick={() => handleTheme(theme === "light" ? "dark" : "light")}>
        <BsSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <BsMoonStars className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Button variant="secondary">
        Run <VscRunAll className="ml-2 h-4 w-4" />
      </Button>

      <Button variant="destructive">
        Clear <GoTrash className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
