'use client'
import Image from "next/image";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { Book } from "@/services/generated/graphql";
import { BookService } from "@/services/api/bookService";
import { Spinner } from "@/components/ui/spinner";
import BookDetailsModal from "@/components/modals/BookDetailsModal";
import { Button } from "@/components/ui/button";


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
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsEditMode(true);
    // TODO: Implement edit book logic
    console.log('Editing book:', book);
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      // TODO: Implement delete book logic
      // await BookService.deleteBook(bookId);
      setPopularBooks(prev => prev.filter(book => book.id !== bookId));
      
      // Optional: Add success notification
      console.log('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error);
      // TODO: Add error handling (e.g., show error toast)
      alert('Failed to delete the book. Please try again.');
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
          {/* <button className="px-6 py-2 bg-[#F4B266] text-white rounded-lg hover:bg-[#e5a55f] transition-colors">
            Watch full list
          </button> */}
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
                          handleEditBook(book);
                        }}
                      >
                        <Edit className="w-4 h-4 text-bookly-brown" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="bg-red-500/80 hover:bg-red-500/90 w-8 h-8 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Optionally add a confirmation dialog before deletion
                          if (window.confirm(`Are you sure you want to delete the book "${book.title}"?`)) {
                            handleDeleteBook(book.id);
                          }
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