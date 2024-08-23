"use client"

import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import CodeBar from './CodeBar';
import { useTheme } from 'next-themes';
import { useCodeStore } from '@/store/store';

type Props = {}

export default function CodeEditor({}: Props) {

  const { setTheme } = useTheme();
  const [code, setCode] = useState<string>("");
  const [mode, setMode] = useState<string>("vs-dark");

  const theme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null;
  const language = useCodeStore((state => state.language));

  useEffect(() => {
    if (theme !== null) {
      handleTheme(theme);
    }
  }, [theme]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleTheme = (theme: string) => {
    const mode = theme === "dark" ? "vs-dark" : "light";
    setMode(mode);
    setTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", theme); // Update the theme in local storage
    }
  };

  return (
    <div className='w-full h-full mt-3'>
      <CodeBar handleTheme={handleTheme} theme={theme || 'light'} />
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme={mode}
        value={code}
        onChange={handleEditorChange}
        className='font-bold p-2'
      />
    </div>
  );
}
