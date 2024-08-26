import { create } from 'zustand'


interface Language {
  language : string
  version : string
  id : string
}
interface CodeState {
  language: Language
  program: string
  output : null | string
  loading : boolean
  changeOutput : (output : string) => void
  changeLanguage: (language: Language) => void
  changeProgram: (program: string) => void
  setLoading : (loading : boolean) => void
}

export const useCodeStore = create<CodeState>((set) => ({
  language: { language: "Node Js", id: "javascript", version: "18.15.0" },
  program: "",
  loading : false,
  output: "", // Initial output state
  changeLanguage: (language) => set(() => ({ language })),
  setLoading : (loading) => set(() => ({loading})),
  changeProgram: (program) => set(() => ({ program })),
  changeOutput: (output) => set(() => ({ output })),
}));
