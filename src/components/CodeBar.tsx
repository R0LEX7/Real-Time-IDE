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

import { useCodeStore } from '@/store/store';
import toast from 'react-hot-toast';
import { languages } from '@/constant';
import { AiOutlineReload } from "react-icons/ai";
import { ClearModal } from './ClearModal';




type Props = {
  handleTheme: (theme: string) => void;
  theme: string;
  executeCode : () => void
  setCode : (code : string) => void
};

export default function CodeBar({ handleTheme, theme , executeCode  ,setCode }: Props) {
  const setLanguage = useCodeStore((state) => state.changeLanguage);
  const language = useCodeStore((state) => state.language);
  const isLoading = useCodeStore((state) => state.loading);

  const handleLanguageChange = (lang: { language: string; id: string; version: string }) => {

    setLanguage(lang);
    toast.success(`${lang.language} Selected`);
  };



  return (
    <div className="mb-3 flex justify-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className='capitalize'>{language.language}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {languages.map((language) => (
            <DropdownMenuItem key={language.id} onClick={() => handleLanguageChange(language)}>
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

      <Button variant="secondary" onClick={executeCode} disabled ={isLoading}>
        {isLoading && (
          <AiOutlineReload className="mr-2 h-4 w-4 animate-spin" />
        )}

        Run <VscRunAll className="ml-2 h-4 w-4" />
      </Button>
      <ClearModal setCode={setCode}/>

    </div>
  );
}
