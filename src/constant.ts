export const languages: { language: string; id: string; version: string }[] = [
  { language: "C", id: "c", version: "10.2.0" },
  { language: "C++", id: "c++", version: "10.2.0" },
  { language: "C#", id: "csharp", version: "6.12.0" }, // Using Mono runtime
  { language: "Dart", id: "dart", version: "2.19.6" },
  { language: "Go", id: "go", version: "1.16.2" },

  { language: "Java", id: "java", version: "15.0.2" },
  { language: "Kotlin", id: "kotlin", version: "1.8.20" },
  { language: "Node Js", id: "javascript", version: "18.15.0" }, // Node.js runtime
  { language: "Python", id: "python", version: "8.2.3" },
  { language: "PHP", id: "php", version: "3.10.0" },
  { language: "Ruby", id: "ruby", version: "3.0.1" },
  { language: "Rust", id: "rust", version: "1.68.2" },
  { language: "Swift", id: "swift", version: "5.3.3" },
  { language: "TypeScript", id: "typescript", version: "5.0.3" },
];

interface IActions {
  JOIN: string
  JOINED: string
  DISCONNECTED: string
  CODE_CHANGE: string
  SYNC_CODE: string
  LEAVE: string
  RUN : string
}


export const ACTIONS : IActions = {
  JOIN: 'join',
  JOINED: 'joined',
  DISCONNECTED: 'disconnected',
  CODE_CHANGE: 'code-change',
  SYNC_CODE: 'sync-code',
  LEAVE: 'leave',
  RUN : "run"
};
