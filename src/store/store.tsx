import { create } from 'zustand'

interface CodeState {
  language: string
  program: string
  changeLanguage: (language: string) => void
  changeProgram: (program: string) => void
}

export const useCodeStore = create<CodeState>((set) => ({
  language: "Javascript",
  program: "",
  changeLanguage: (language) => set(() => ({ language })),
  changeProgram: (program) => set(() => ({ program })),
}))
