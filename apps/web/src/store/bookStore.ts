import { create } from 'zustand';
import { Book } from '@/services/generated/graphql';

interface BookState {
  newBook: Book | null;
  setNewBook: (book: Book) => void;
  resetNewBook: () => void;
}

export const useBookStore = create<BookState>((set) => ({
  newBook: null,
  setNewBook: (book) => set({ newBook: book }),
  resetNewBook: () => set({ newBook: null }),
}));