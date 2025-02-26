'use client'
import AuthorDetailsModal from "@/components/modals/AuthorDetailsModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { AuthorService } from "@/services/api/authorService";
import { BookService } from "@/services/api/bookService";
import { Author, Book } from "@/services/generated/graphql";
import { useAuthorStore } from "@/store/authorStore";
import { Edit, Trash2, User } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";


export default function Authors() {
  const [popularAuthors, setPopularAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const observerTarget = useRef(null);
  const initialFetchDone = useRef(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [authorBooks, setAuthorBooks] = useState<Book[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

  const { toast } = useToast()

  const newAuthor = useAuthorStore(state => state.newAuthor);
  const resetNewAuthor = useAuthorStore(state => state.resetNewAuthor);

  const openAuthorDetails = async (author: Author) => {
    setSelectedAuthor(author);
    setIsAuthorModalOpen(true);
    setIsLoadingBooks(true);
    try {
      // Fetch books for this author
      const books = await BookService.getBooksByAuthor(author.id);
      setAuthorBooks(books);
    } catch (error) {
      console.error('Error fetching author books:', error);
      toast({
        title: "Error",
        description: "Failed to load author's books. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      setAuthorBooks([]);
    } finally {
      setIsLoadingBooks(false);
      setIsAuthorModalOpen(true);
    }
  };

  const closeAuthorDetails = () => {
    setIsAuthorModalOpen(false);
    setTimeout(() => setSelectedAuthor(null), 300);
  };

  const fetchAuthors = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const newAuthors = await AuthorService.getAuthors(pageNumber);

      console.log('PageNumber: ', pageNumber)
      console.log(newAuthors)

      if (newAuthors.length === 0) {
        setHasMore(false);
      } else {
        setPopularAuthors(prev => [...prev, ...newAuthors]);
        setPage(pageNumber + 1);
      }
    } catch (err) {
      console.error('Error fetching authors:', err);
      setError('Unable to load authors. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialFetchDone.current) {
      console.log('Initial fetch starting');
      fetchAuthors(1);
      initialFetchDone.current = true;
    }
  }, [fetchAuthors]);

  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchAuthors(page);
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
  }, [fetchAuthors, hasMore, loading, page]);

  useEffect(() => {
    if (newAuthor) {
      setPopularAuthors(prev => {
        const exists = prev.some(author => author.id === newAuthor.id);
        if (exists) return prev;
        return [newAuthor, ...prev];
      });
      resetNewAuthor();
    }
  }, [newAuthor, resetNewAuthor]);

  const handleEditAuthor = (author: Author) => {
    setSelectedAuthor(author);
    setIsEditMode(true);
    // TODO: Implement edit author logic
    console.log('Editing author:', author);
  };

  const openDeleteModal = (author: Author) => {
    setAuthorToDelete(author);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => setAuthorToDelete(null), 300);
  };

  const handleDeleteAuthor = async () => {
    if (!authorToDelete) return;
    try {
      setIsDeleting(true);
      const authorId = authorToDelete.id
      await AuthorService.deleteAuthor({ authorId });
      setPopularAuthors(prev => prev.filter(author => author.id !== authorId));

      toast({
        title: "Success!",
        description: "Author has been deleted successfully.",
        variant: "default",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      });
    } catch (error) {
      console.error('Error deleting author:', error);
      toast({
        title: "Error",
        description: "Failed to delete the author. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const isEmpty = popularAuthors.length === 0 && !loading;
  return (
    <div className="p-8">
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-regular text-bookly-brown mb-2">POPULAR AUTHORS</h2>
            <p className="text-gray-500 text-sm">Discover talented authors and their amazing works.</p>
          </div>
        </div>

        {isEmpty && loading ? (
          <div className="flex justify-center items-center p-12">
            <Spinner size="lg" className="text-bookly-orange" />
          </div>
        ) : error && popularAuthors.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-gray-200">
            <User className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-medium text-bookly-brown mb-2">Error loading authors</h3>
            <p className="text-gray-500 text-center max-w-md">{error}</p>
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-gray-200">
            <User className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-bookly-brown mb-2">No authors available right now</h3>
            <p className="text-gray-500 text-center max-w-md">
              We're currently updating our collection. Please check back soon for our latest authors.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {popularAuthors.map((author, index) => (
                <div key={`${author.id}-${index}`} className="flex flex-col group relative">
                  <div className="aspect-[1/1] relative w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => openAuthorDetails(author)}
                  >
                    {author.avatarUrl ? (
                      <Image
                        src={author.avatarUrl}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-bookly-cream/50">
                        <User size={48} className="text-bookly-brown opacity-50 mb-2" />
                        <p className="text-xs text-center text-bookly-textInput mt-1">
                          No photo available
                        </p>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="secondary"
                        className="bg-white/80 hover:bg-white/90 w-8 h-8 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAuthor(author);
                        }}
                      >
                        <Edit className="w-4 h-4 text-bookly-brown" />
                      </Button>
                      <Button
                        variant="destructive"
                        className="bg-red-500/80 hover:bg-red-500/90 w-8 h-8 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(author);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="mt-2 font-medium text-bookly-brown text-sm truncate">{author.name}</h3>
                  <p className="text-gray-500 text-xs truncate">{author && author.books ? author.books.length : 0} books</p>
                </div>
              ))}
            </div>
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onConfirm={handleDeleteAuthor}
              isLoading={isDeleting}
              title="Delete Author"
              description={`Are you sure you want to delete "${authorToDelete?.name}"? This action cannot be undone.`}
            />
            <AuthorDetailsModal
              author={selectedAuthor}
              books={authorBooks}
              isOpen={isAuthorModalOpen}
              onClose={closeAuthorDetails}
              isLoading={isLoadingBooks}
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