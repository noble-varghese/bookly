import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Spinner } from "@/components/ui/spinner"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { CreateBookInput } from '@/types/book';

interface AddBookModalProps {
    isOpen: boolean,
    onClose: () => void;
    onSubmit: (bookData: CreateBookInput) => void
    isLoading?: boolean;
}

const AddBookModal = ({ isOpen, onClose, onSubmit, isLoading = false }: AddBookModalProps) => {
    const [bookData, setBookData] = useState<CreateBookInput>({
        title: '',
        description: '',
        publishedDate: '',
        authorId: '',
        coverUrl: '',
        coverImage: null
    })
    const [coverPreview, setCoverPreview] = useState<string>('');

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
            setBookData({
                ...bookData,
                coverImage: file
            });
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    
    const resetForm = () => {
        setBookData({
            title: '',
            description: '',
            publishedDate: '',
            authorId: '', 
            coverUrl: '',
            coverImage: null
        })
        setCoverPreview('')
    }
    
    const handleClose = () => {
        resetForm();
        onClose();
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(bookData); 
        resetForm();
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
          <DialogContent className="max-w-2xl bg-white rounded-2xl p-0 overflow-hidden">
            <DialogTitle className="sr-only">Add new book</DialogTitle>

            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-bookly-brown">Add new book</h2>
                {/* <button
                  onClick={handleClose}
                  className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100"
                  aria-label="Close dialog"
                >
                  <X size={20} className="text-bookly-textInput" />
                </button> */}
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
                        value={bookData.title}
                        onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                        className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                        required
                        placeholder='Harry Potter and Cham...'
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-bookly-brown mb-1">
                        Author ID
                      </label>
                      <input
                        type="text"
                        value={bookData.authorId}
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
                        value={bookData.description}
                        onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                        className="w-full p-2 border  text-bookly-textInput border-bookly-cream rounded-lg h-32 resize-none focus:outline-none focus:border-bookly-orange"
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
                      </>
                    ) : (
                      "Add book"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      );
};

export default AddBookModal;