// components/modals/AuthorDetailsModal.tsx
import { Book, Author } from "@/services/generated/graphql";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, BookOpen, User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

interface AuthorDetailsModalProps {
  author: Author | null;
  books?: Book[];
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

const AuthorDetailsModal = ({ author, books = [], isOpen, onClose, isLoading = false }: AuthorDetailsModalProps) => {
  if (!author) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-white rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Author Details: {author.name}</DialogTitle>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-bookly-cream p-6 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[220px] rounded-full shadow-lg overflow-hidden mb-4">
              {author.avatarUrl ? (
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-bookly-cream/50 rounded-full">
                  <User size={48} className="text-bookly-brown opacity-50" />
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold text-bookly-brown text-center mb-2">{author.name}</h2>
            
            <div className="flex items-center text-sm text-bookly-textInput">
              <BookOpen size={16} className="mr-1" />
              <span>{books.length} books</span>
            </div>
          </div>

          {/* Author details */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-bookly-brown">About the Author</h2>
              <button
                onClick={onClose}
                className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={20} className="text-bookly-textInput" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-bookly-textInput">{author.biography || "No biography available."}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-bookly-brown mb-3 flex items-center">
                <BookOpen size={20} className="mr-2" />
                Books by {author.name}
              </h3>

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Spinner size="md" className="text-bookly-orange" />
                </div>
              ) : books.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {books.map(book => (
                    <div key={book.id} className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-sm border border-bookly-cream bg-bookly-cream/30 w-full h-full">
                      {book.coverUrl ? (
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                          <BookOpen size={20} className="text-bookly-brown opacity-50 mb-1" />
                          <span className="text-xs text-bookly-brown truncate w-full">{book.title}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-bookly-cream">
                  <BookOpen size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-bookly-textInput">No books found for this author.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorDetailsModal;