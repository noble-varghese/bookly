import { FormEvent, useEffect, useState } from 'react'

interface AddBookModalProps {
    isOpen: boolean,
    onClose: () => void;
    onSubmit: (bookData: any) => void
}

const AddBookModal = ({ isOpen, onClose, onSubmit }: AddBookModalProps) => {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        coverImage: null
    })

    // Handling the esc keys preesses
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleEscKey);

        // Cleanup listener
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen]);


    if (!isOpen) return null;

    const resetForm = () => {
        setBookData({
            title: '',
            author: '',
            category: '',
            description: '',
            coverImage: null
        })
    }

    const handleClose = () => {
        resetForm();
        onClose();
    }

    // Handle clicking outside.
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(bookData);
        resetForm();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-bookly-brown mb-6">Add New Book</h2>

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
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-bookly-brown mb-1">
                                    Author
                                </label>
                                <input
                                    type="text"
                                    value={bookData.author}
                                    onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                                    className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-bookly-brown mb-1">
                                    Category
                                </label>
                                <select
                                    value={bookData.category}
                                    onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
                                    className="w-full p-2  text-bookly-textInput border border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="fantasy">Fantasy</option>
                                    <option value="drama">Drama</option>
                                    <option value="detective">Detective</option>
                                    {/* Add more categories */}
                                    {/* TODO: Make this dynamic instead of hard-coded */}
                                </select>
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
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-bookly-brown mb-1">
                                    Cover Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setBookData({ ...bookData, coverImage: e.target.files?.[0] || null })}
                                    className="w-full p-2 border border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2 text-bookly-brown hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-bookly-orange text-white rounded-lg hover:bg-bookly-orange/90 transition-colors"
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;