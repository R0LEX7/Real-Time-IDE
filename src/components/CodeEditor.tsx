"use client"

import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import CodeBar from './CodeBar';
import { useTheme } from 'next-themes';
import { useCodeStore } from '@/store/store';
import { executeCode as runCode} from "@/api/codeRunner"
import toast from 'react-hot-toast';




type Props = {}

export default function CodeEditor({}: Props) {

  const { setTheme } = useTheme();
  const [code, setCode] = useState<string>("");
  const [mode, setMode] = useState<string>("vs-dark");

  const theme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null;
  const language = useCodeStore((state => state.language));
  const setLoading = useCodeStore((state => state.setLoading));
  const changeOutput  =  useCodeStore((state => state.changeOutput))

  useEffect(() => {
    if (theme !== null) {
      handleTheme(theme);
    }

  }, [theme]);

  const handleEditorChange = async (value: string | undefined) => {
    setCode(value || "");


  };



  const executeCode = async () => {
      console.log("code lang " , language)
    setLoading(true)
    try {
      const output = await runCode(code ,language );
      console.log("result from runcode" , output)
      changeOutput(output)
    } catch (error : any ) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }



  }

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
      <CodeBar handleTheme={handleTheme} theme={theme || 'light'}  executeCode={executeCode} setCode = {setCode}/>
      <Editor
        height="100%"
        width="100%"

        language={language.id}
        theme={mode}
        value={code}
        onChange={handleEditorChange}
        className='font-bold p-2'
      />
    </div>
  );
}
