
interface ImportMetaEnv {
  VITE_API_URL?: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
