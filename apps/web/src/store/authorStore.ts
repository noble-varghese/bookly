// src/store/authorStore.ts
import { create } from 'zustand';
import { Author } from '@/services/generated/graphql';

interface AuthorState {
  newAuthor: Author | null;
  setNewAuthor: (author: Author) => void;
  resetNewAuthor: () => void;
}

export const useAuthorStore = create<AuthorState>((set) => ({
  newAuthor: null,
  setNewAuthor: (author) => set({ newAuthor: author }),
  resetNewAuthor: () => set({ newAuthor: null }),
}));