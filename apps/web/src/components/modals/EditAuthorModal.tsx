
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Spinner } from "@/components/ui/spinner"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { UpdateAuthorInput } from '@/types/author';
import { useToast } from '../ui/use-toast';
import { Author } from '@/services/generated/graphql';

interface EditAuthorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (authorId: string, authorData: UpdateAuthorInput) => void;
    isLoading?: boolean;
    author: Author | null;
}

const EditAuthorModal = ({ isOpen, onClose, onSubmit, isLoading = false, author }: EditAuthorModalProps) => {
    const [authorData, setAuthorData] = useState<UpdateAuthorInput>({
        name: '',
        biography: '',
        bornDate: '',
        avatarUrl: '',
        avatarImage: null
    });
    const [avatarPreview, setAvatarPreview] = useState<string>('');
    const { toast } = useToast();

    // Initialize form data when author changes or modal opens
    useEffect(() => {
        if (author && isOpen) {
            // Format the date to YYYY-MM-DD for the date input
            let formattedDate = '';
            
            // Date formatting function
            const formatDateForInput = (dateString: string | null | undefined): string => {
                if (!dateString) return '';
                
                try {
                    const date = new Date(dateString);
                    if (isNaN(date.getTime())) return '';
                    
                    // Get year, month and day and format as YYYY-MM-DD
                    const year = date.getFullYear();
                    // Month is 0-indexed, so add 1 and pad with leading zero if needed
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    
                    return `${year}-${month}-${day}`;
                } catch (error) {
                    console.error('Error formatting date:', error);
                    return '';
                }
            };
            
            formattedDate = formatDateForInput(author.bornDate);
            
            setAuthorData({
                name: author.name || '',
                biography: author.biography || '',
                bornDate: formattedDate,
                avatarUrl: author.avatarUrl || '',
                avatarImage: null
            });
            
            // Set avatar preview if available
            if (author.avatarUrl) {
                setAvatarPreview(author.avatarUrl);
            } else {
                setAvatarPreview('');
            }
        }
    }, [author, isOpen]);

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
            setAuthorData({
                ...authorData,
                avatarImage: file,
                avatarUrl: '' // Clear the previous avatarUrl as we'll be using the new image
            });

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!author) return;
        
        // Pass both the author ID and the update data to the parent
        onSubmit(author.id, authorData);
    };

    if (!author) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-2xl bg-white rounded-2xl p-0 overflow-hidden">
                <DialogTitle className="sr-only">Edit author</DialogTitle>

                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-bookly-brown">Edit author</h2>
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
                                        Author name
                                    </label>
                                    <input
                                        type="text"
                                        value={authorData.name || ''}
                                        onChange={(e) => setAuthorData({ ...authorData, name: e.target.value })}
                                        className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-bookly-brown mb-1">
                                        Date of birth
                                    </label>
                                    <input
                                        type="date"
                                        value={authorData.bornDate || ''}
                                        onChange={(e) => setAuthorData({ ...authorData, bornDate: e.target.value })}
                                        className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-bookly-brown mb-1">
                                        Avatar Image
                                    </label>
                                    <div className="border border-bookly-cream rounded-lg p-3">
                                        {avatarPreview && (
                                            <div className="mb-3">
                                                <img
                                                    src={avatarPreview}
                                                    alt="Author avatar preview"
                                                    className="h-32 w-32 mx-auto object-cover rounded-full"
                                                />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="avatar-image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full text-sm text-bookly-textInput file:mr-3 file:py-2 file:px-4 file:text-sm file:border-0 file:rounded-lg file:bg-bookly-orange file:text-white hover:file:bg-bookly-orange/90"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-bookly-brown mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        value={authorData.biography || ''}
                                        onChange={(e) => setAuthorData({ ...authorData, biography: e.target.value })}
                                        className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg h-52 resize-none focus:outline-none focus:border-bookly-orange"
                                    ></textarea>
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
                                    "Update Author"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditAuthorModal;