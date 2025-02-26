'use client'
import BookDetailsModal from "@/components/modals/BookDetailsModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import EditBookModal from "@/components/modals/EditBookModal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { BookService } from "@/services/api/bookService";
import { CdnStoreService } from "@/services/api/commonService";
import { Book } from "@/services/generated/graphql";
import { useBookStore } from "@/store/bookStore";
import { EditBookInput } from "@/types/book";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";


export default function Home() {
  const [popularBooks, setPopularBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const observerTarget = useRef(null);
  const initialFetchDone = useRef(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [bookToUpdate, setBookToUpdate] = useState<Book | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingBook, setIsUpdatingBook] = useState(false);

  const { toast } = useToast()

  const newBook = useBookStore(state => state.newBook);
  const resetNewBook = useBookStore(state => state.resetNewBook);

  const openBookDetails = (book: Book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const closeBookDetails = () => {
    setIsBookModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  const handleReviewSubmit = async () => {

  }

  const fetchBooks = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const newBooks = await BookService.getBooks(pageNumber);

      console.log('PageNumber: ', pageNumber)
      console.log(newBooks)

      if (newBooks.length === 0) {
        setHasMore(false);
      } else {
        setPopularBooks(prev => [...prev, ...newBooks]);
        setPage(pageNumber + 1);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Unable to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialFetchDone.current) {
      console.log('Initial fetch starting');
      fetchBooks(1);
      initialFetchDone.current = true;
    }
  }, [fetchBooks]);

  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchBooks(page);
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchBooks, hasMore, loading, page]);

  useEffect(() => {
    if (newBook) {
      setPopularBooks(prev => {
        const exists = prev.some(book => book.id === newBook.id);
        if (exists) return prev;
        return [newBook, ...prev];
      });
      resetNewBook();
    }
  }, [newBook]);

  const openEditModal = (book: Book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true)
    // TODO: Implement edit book logic
    console.log('Editing book:', book);
  };

  const closeEditModal = ()=> {
    setSelectedBook(null);
    setIsEditModalOpen(false)
  }

  const openDeleteModal = (book: Book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => setBookToDelete(null), 300);
  };

  const handleEditBook = async(bookId: string, updateData: EditBookInput) => {
    if (!bookId) return;

    try{
      setIsUpdatingBook(true);

      if (updateData.coverImage) {
        const coverUrl = await CdnStoreService.uploadImage(updateData.coverImage)
        updateData.coverUrl = coverUrl
      }
      console.log(updateData)
      delete updateData.coverImage
      const updatedBook = await BookService.updateBook(bookId, updateData)
      
      setPopularBooks(prev => 
        prev.map(book => book.id === bookId ? updatedBook : book)
      );

      setIsEditModalOpen(false)
      toast({
        title: "Success!",
        description: "Book has been updated successfully. Please try again.",
        variant: "default",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      });
      
    } catch(error) {
      console.error('Error updating the book: ', error)
      toast({
        title: "Error",
        description: "Failed to update the book. Please try again.",
        variant: "default",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      });
    } finally {
      setIsUpdatingBook(false)
    }
  }

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;
    try {
      setIsDeleting(true);
      const bookId = bookToDelete.id
      await BookService.deleteBook({ bookId });
      setPopularBooks(prev => prev.filter(book => book.id !== bookId));

      toast({
        title: "Success!",
        description: "Book has been deleted successfully.",
        variant: "default",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      });
    } catch (error) {
      console.error('Error deleting book:', error);
      toast({
        title: "Error",
        description: "Failed to delete the book. Please try again.",
        variant: "destructive",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const isEmpty = popularBooks.length === 0 && !loading;
  return (
    <div className="p-8">
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-regular text-bookly-brown mb-2">POPULAR BESTSELLERS</h2>
            <p className="text-gray-500 text-sm">We picked up the most popular books for you, based on your taste. Check it!</p>
          </div>
        </div>

        {isEmpty && loading ? (
          <div className="flex justify-center items-center p-12">
            <Spinner size="lg" className="text-bookly-orange" />
          </div>
        ) : error && popularBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-gray-200">
            <BookOpen className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-medium text-bookly-brown mb-2">Error loading books</h3>
            <p className="text-gray-500 text-center max-w-md">{error}</p>
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-bookly-brown mb-2">No books available right now</h3>
            <p className="text-gray-500 text-center max-w-md">
              We're currently updating our collection. Please check back soon for our latest recommendations.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {popularBooks.map((book, index) => (
                <div key={`${book.id}-${index}`} className="flex flex-col group relative">
                  <div className="aspect-[2/3] relative w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => openBookDetails(book)}
                  >
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-bookly-cream/50">
                        <BookOpen size={48} className="text-bookly-brown opacity-50 mb-2" />
                        <p className="text-xs text-center text-bookly-textInput mt-1">
                          No cover available
                        </p>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="secondary"
                        className="bg-white/80 hover:bg-white/90 w-8 h-8 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(book);
                        }}
                      >
                        <Edit className="w-4 h-4 text-bookly-brown" />
                      </Button>
                      <Button
                        variant="destructive"
                        className="bg-red-500/80 hover:bg-red-500/90 w-8 h-8 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(book);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="mt-2 font-medium text-bookly-brown text-sm truncate">{book.title}</h3>
                  <p className="text-gray-500 text-xs truncate">{book.author.name}</p>
                </div>
              ))}
            </div>
            <BookDetailsModal
              book={selectedBook}
              isOpen={isBookModalOpen}
              onClose={closeBookDetails}
              onReviewSubmit={handleReviewSubmit}
            />
            <EditBookModal
              book={selectedBook}
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              onSubmit={handleEditBook}
              isLoading={isUpdatingBook}
            />
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onConfirm={handleDeleteBook}
              isLoading={isDeleting}
              title="Delete Book"
              description={`Are you sure you want to delete "${bookToDelete?.title}"? This action cannot be undone.`}
            />

            {hasMore && (
              <div
                ref={observerTarget}
                className="flex justify-center mt-8 py-4"
              >
                {loading && <Spinner size="md" className="text-bookly-orange" />}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}