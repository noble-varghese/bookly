import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Book } from '@/services/generated/graphql';
import { EditBookInput } from '@/types/book';
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookId: string, bookData: EditBookInput) => void;
  isLoading?: boolean;
  book: Book | null;
}

const EditBookModal = ({ isOpen, onClose, onSubmit, isLoading = false, book }: EditBookModalProps) => {
  const [bookData, setBookData] = useState<EditBookInput>({
    title: '',
    description: '',
    publishedDate: '',
    authorId: '',
    coverUrl: '',
    coverImage: null
  });
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null);

  // Initialize form data when book changes or modal opens
  useEffect(() => {
    if (book && isOpen) {
      // Format the date to YYYY-MM-DD for the date input
      const formattedDate = book.publishedDate ? 
        new Date(book.publishedDate).toISOString() : '';
      
      setBookData({
        title: book.title || '',
        description: book.description || '',
        publishedDate: formattedDate,
        authorId: book.author?.id || '',
        coverUrl: ''
      });
      
      setCoverImage(null);
    }
  }, [book, isOpen]);

  // Handling the esc key presses
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear the previous coverUrl as we'll be using the new image
      setBookData(prev => ({ ...prev, coverUrl: '' , coverImage: file}));
    }
  };
  
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!book) return;
    
    // Create the final data to submit
    const publishedDate = book.publishedDate ? 
        new Date(book.publishedDate).toISOString() : '';
    const finalData: EditBookInput = { ...bookData, publishedDate  };
    
    // Pass both the book ID and the update data to the parent
    onSubmit(book.id, finalData);
  };

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl bg-white rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Edit book</DialogTitle>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-bookly-brown">Edit book</h2>
            <button
              onClick={handleClose}
              className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100"
              aria-label="Close dialog"
            >
              <X size={20} className="text-bookly-textInput" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bookly-brown mb-1">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={bookData.title || ''}
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                    className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bookly-brown mb-1">
                    Author ID
                  </label>
                  <input
                    type="text"
                    value={bookData.authorId || ''}
                    onChange={(e) => setBookData({ ...bookData, authorId: e.target.value })}
                    className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bookly-brown mb-1">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={bookData.publishedDate}
                    onChange={(e) => setBookData({ ...bookData, publishedDate: e.target.value })}
                    className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bookly-brown mb-1">
                    Description  
                  </label>
                  <textarea
                    value={bookData.description || ''}
                    onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                    className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg h-32 resize-none focus:outline-none focus:border-bookly-orange"
                    required
                  ></textarea>  
                </div>

                <div>
                  <label className="block text-sm font-medium text-bookly-brown mb-1">
                    Cover Image
                  </label>
                  <div className="border border-bookly-cream rounded-lg p-3">
                    {coverPreview && (
                      <div className="mb-3">
                        <img 
                          src={coverPreview} 
                          alt="Book cover preview" 
                          className="h-32 mx-auto object-contain"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      id="cover-image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-sm text-bookly-textInput file:mr-3 file:py-2 file:px-4 file:text-sm file:border-0 file:rounded-lg file:bg-bookly-orange file:text-white hover:file:bg-bookly-orange/90"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button" 
                onClick={handleClose}
                className="px-6 py-2 text-bookly-brown hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button  
                type="submit"
                className="px-6 py-2 bg-bookly-orange text-white rounded-lg hover:bg-bookly-orange/90 transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner className="text-white mr-2" size="sm" />
                    <span>Updating...</span>
                  </>
                ) : (
                  "Update book"
                )}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;