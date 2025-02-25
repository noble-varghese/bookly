
import { FormEvent, useEffect, useState } from 'react'
import { Spinner } from "@/components/ui/spinner"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface AddAuthorModalProps {
    isOpen: boolean,
    onClose: () => void;
    onSubmit: (authorData: CreateAuthorInput) => void
    isLoading?: boolean;
}

interface CreateAuthorInput {
    name: string;
    bio: string;
    bornDate: string;
    avatarUrl: string;
}

const AddAuthorModal = ({ isOpen, onClose, onSubmit, isLoading = false }: AddAuthorModalProps) => {
    const [authorData, setAuthorData] = useState<CreateAuthorInput>({
        name: '',
        bio: '',
        bornDate: '',
        avatarUrl: '',
    })

    // Handling the esc key presses
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


    const resetForm = () => {
        setAuthorData({
            name: '',
            bio: '',
            bornDate: '',
            avatarUrl: '',
        })
    }

    const handleClose = () => {
        resetForm();
        onClose();
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(authorData)
        onSubmit(authorData);
        resetForm();
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-2xl bg-white rounded-2xl p-0 overflow-hidden">
                <DialogTitle className="sr-only">Add new author</DialogTitle>

                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-bookly-brown">Add new author</h2>
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
                                        value={authorData.name}
                                        onChange={(e) => setAuthorData({ ...authorData, name: e.target.value })}
                                        className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                                        required
                                        placeholder='J.K Rowling'
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-bookly-brown mb-1">
                                        Date of birth
                                    </label>
                                    <input
                                        type="date"
                                        value={authorData.bornDate}
                                        onChange={(e) => setAuthorData({ ...authorData, bornDate: e.target.value })}
                                        className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-bookly-brown mb-1">
                                        Profile url
                                    </label>
                                    <input
                                        type="text"
                                        value={authorData.avatarUrl}
                                        onChange={(e) => setAuthorData({ ...authorData, avatarUrl: e.target.value })}
                                        className="w-full p-2 border text-bookly-textInput border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-bookly-brown mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        value={authorData.bio}
                                        onChange={(e) => setAuthorData({ ...authorData, bio: e.target.value })}
                                        className="w-full p-2 border  text-bookly-textInput border-bookly-cream rounded-lg h-52 resize-none focus:outline-none focus:border-bookly-orange"
                                        required
                                        placeholder='Write about the author...'
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
                                    </>
                                ) : (
                                    "Add Author"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddAuthorModal;