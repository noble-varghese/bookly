// components/modals/BookDetailsModal.tsx
import { Book } from "@/services/generated/graphql";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Star, MessageCircle, BookOpen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmit: (bookId: string, rating: number, comment: string) => void;
}

const BookDetailsModal = ({ book, isOpen, onClose, onReviewSubmit }: BookDetailsModalProps) => {
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [isReviewOpen, setIsReviewOpen] = useState(false)

  if (!book) return null;

  // Mock ratings and reviews - replace with actual data
  const rating = 4.5;
  const reviewCount = 28;
  const reviews = [
    { id: 1, user: "John D.", rating: 5, comment: "One of my all-time favorites! The character development is exceptional.", date: "2 months ago" },
    { id: 2, user: "Sarah M.", rating: 4, comment: "A compelling read with unexpected twists. Highly recommended for fans of the genre.", date: "3 weeks ago" }
  ];

  const handleReviewSubmit = () => {
      onReviewSubmit(book.id, reviewRating, reviewComment);
      setReviewRating(0);
      setReviewComment("");
      setIsReviewOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-white rounded-2xl p-0 overflow-hidden">
        {/* DialogTitle is required for accessibility */}
        <DialogTitle className="sr-only">Book Details: {book.title}</DialogTitle>

        <div className="flex flex-col md:flex-row">
          {/* Book cover sidebar */}
          <div className="md:w-1/3 bg-bookly-cream p-6 flex flex-col items-center">
            <div className="relative w-full aspect-[2/3] max-w-[220px] rounded-lg shadow-lg overflow-hidden mb-4">
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
                  <p className="text-center text-bookly-brown font-medium">No cover available</p>
                </div>
              )}
            </div>

            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(rating) ? "text-bookly-orange fill-bookly-orange" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-bookly-brown font-medium">{rating}</span>
            </div>

            <div className="flex items-center text-sm text-bookly-textInput">
              <MessageCircle size={16} className="mr-1" />
              <span>{reviewCount} reviews</span>
            </div>
          </div>

          {/* Book details */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-bookly-brown">{book.title}</h2>
              <button
                onClick={onClose}
                className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={20} className="text-bookly-textInput" />
              </button>
            </div>

            <p className="mb-4 text-bookly-textInput">by <span className="font-medium text-bookly-brown">{book.author.name}</span></p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-bookly-brown mb-2">Description</h3>
              <p className="text-bookly-textInput">{book.description || "No description available."}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-bookly-brown mb-3 flex items-center">
                <MessageCircle size={20} className="mr-2" />
                Reader Reviews
              </h3>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-bookly-cream pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-bookly-brown">{review.user}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? "text-bookly-orange fill-bookly-orange" : "text-gray-300"}
                            />
                          ))}
                          <span className="ml-2 text-xs text-bookly-textInput">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-bookly-textInput">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-bookly-textInput">No reviews yet. Be the first to review!</p>
              )}

              {isReviewOpen ? (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className={`cursor-pointer ${i < reviewRating ? "text-bookly-orange fill-bookly-orange" : "text-gray-300"}`}
                        onClick={() => setReviewRating(i + 1)}
                      />
                    ))}
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                    placeholder="Write your review..."
                    rows={4}
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleReviewSubmit}
                      className="px-4 py-2 text-sm bg-bookly-orange text-white rounded-lg hover:bg-bookly-orange/90 transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="mt-4 px-4 py-2 text-sm bg-white border border-bookly-orange text-bookly-orange rounded-lg hover:bg-bookly-orange/10 transition-colors"
                >
                  Write a Review
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsModal;