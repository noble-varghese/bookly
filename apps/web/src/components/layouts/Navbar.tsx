'use client'
import { useToast } from "@/components/ui/use-toast"
import { BookService } from '@/services/api/bookService'
import { CreateBookInput } from '@/types/book'
import { BookHeart, BookmarkCheckIcon, Home, LogOut, PlusCircle, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AddBookModal from '../modals/AddBookModal'
import { useAuth } from '../providers/AuthProvider'
import { Toaster } from '../ui/toaster'
import AddAuthorModal from "../modals/AddAuthorModal"


const Navbar = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false)
  const [showAddAuthorModal, setShowAddAuthorModal] = useState(false)
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const { toast } = useToast()

  const handleAddBook = async (bookData: any) => {
    setIsCreatingBook(true);
    try {
      
      const bookInput: CreateBookInput = {
        title: bookData.title,
        authorId: bookData.authorId,
        description: bookData.description,
        publishedDate: '1925-04-10T00:00:00Z',
        coverUrl: bookData.coverUrl
      }

      const newBook = await BookService.createBook(bookInput)

      console.log('THis is being ivoked~!!!!!!!!!!!!!!')
      setShowAddBookModal(false);
      toast({
        title: "Success!",
        description: "Book has been added successfully.",
        variant: "default",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      })
    } catch (error) {
      console.log('There is an error....')
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      })
    } finally {
      setIsCreatingBook(false);
    }
  }

  const handleAddAuthor = async(authorData: any) => {
    setShowAddAuthorModal(false);
  }

  const {logout} = useAuth()

  const handleLogout = async () => {
      await logout()
  }

  return (
    <>

      <nav className="w-64 bg-bookly-cream h-screen gap-0.5 p-6 flex flex-col">
        <div className="flex mt-8 mb-2 items-center">
          <Link href="/" className="flex items-center text-2xl font-semibold">
            <BookmarkCheckIcon
              size={28}
              fill='#FCA72C'
              color="#F2E5D0"
              strokeWidth={1.5}
            />
            <span className="text-bookly-brown">Sprinto Library</span>
          </Link>
        </div>

        <div className="flex flex-col gap-4 flex-grow mt-16">
          <NavItem icon={<Home size={20} />} label="Discover" href="/" active />
          <NavItem icon={<Users size={20} />} label="Favorite authors" href="/authors" />
          <NavItem icon={<BookHeart size={20} />} label="Favorite books" href="/books" />
          <NavItem
            icon={<PlusCircle size={20} />}
            label="Add book"
            href="#"
            onClick={() => setShowAddBookModal(true)}
          />
          <NavItem
            icon={<PlusCircle size={20} />}
            label="Add author"
            href="#"
            onClick={() => setShowAddAuthorModal(true)}
          />
          <NavItem icon={<Settings size={20} />} label="Settings" href="/settings" />
        </div>

        <NavItem icon={<LogOut size={20} />} label="Log out" href='#' onClick={handleLogout} />
      </nav>

      <AddBookModal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        onSubmit={handleAddBook}
        isLoading={isCreatingBook}
      />
      <AddAuthorModal
        isOpen={showAddAuthorModal}
        onClose={() => setShowAddAuthorModal(false)}
        onSubmit={handleAddAuthor}
        isLoading={isCreatingBook}
      />
      <Toaster/>
    </>
  )
}

const NavItem = ({ icon, label, href, active = false, onClick }: {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  onClick?: () => void
}) => {
  const router = useRouter()

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        } else {
          router.push(href)
        }
      }}
      className={`flex items-center gap-3 p-2 rounded-lg transition-colors
            ${active ? 'bg-white text-bookly-brown' : 'text-gray-600 hover:bg-white'}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default Navbar