'use client'
import { useToast } from "@/components/ui/use-toast"
import { AuthorService } from "@/services/api/authorService"
import { BookService } from '@/services/api/bookService'
import { CdnStoreService } from "@/services/api/commonService"
import { useBookStore } from "@/store/bookStore"
import { CreateAuthorInput } from "@/types/author"
import { CreateBookInput } from '@/types/book'
import { BookmarkCheckIcon, Home, LibraryBig, LogOut, PlusCircle, Settings, UserPlus, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import AddAuthorModal from "../modals/AddAuthorModal"
import AddBookModal from '../modals/AddBookModal'
import { useAuth } from '../providers/AuthProvider'
import { Toaster } from '../ui/toaster'
import { useAuthorStore } from "@/store/authorStore"


const Navbar = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false)
  const [showAddAuthorModal, setShowAddAuthorModal] = useState(false)
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const [isCreatingAuthor, setIsCreatingAuthor] = useState(false);
  const { toast } = useToast()
  const pathname = usePathname();

  const setNewBook = useBookStore(state => state.setNewBook);
  const setNewAuthor = useAuthorStore(state => state.setNewAuthor);

  const handleAddBook = async (bookData: any) => {
    setIsCreatingBook(true);
    try {
      const bookInput: CreateBookInput = {
        title: bookData.title,
        authorId: bookData.authorId,
        description: bookData.description,
        publishedDate: '1925-04-10T00:00:00Z',
        coverUrl: ''
      }
      if (bookData.coverImage){
        const coverUrl = await CdnStoreService.uploadImage(bookData.coverImage) 
        bookInput.coverUrl = coverUrl
      }
      const newBook = await BookService.createBook(bookInput)
      setShowAddBookModal(false);
      toast({
        title: "Success!",
        description: "Book has been added successfully.",
        variant: "default",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      })
      setNewBook(newBook)
    } catch (error) {
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

  const handleAddAuthor = async(authorData: CreateAuthorInput) => {
    setIsCreatingAuthor(true)
    try{
      if (authorData.avatarImage){
        const avatarUrl = await CdnStoreService.uploadImage(authorData.avatarImage) 
        authorData.avatarUrl = avatarUrl
      }
      const author = await AuthorService.createAuthor({
        name: authorData.name,
        biography: authorData.bio,
        bornDate :authorData.bornDate,
        avatarUrl: authorData.avatarUrl
      })
      console.log(authorData)
      toast({
        title: "Success!",
        description: "Author has been added successfully.",
        variant: "default",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      })
      setNewAuthor(author)
    } catch(error) {
      toast({
        title: "Error",
        description: "Failed to add author. Please try again.",
        variant: "destructive",
        duration: 3000,
        className: "bg-bookly-bg text-bookly-brown"
      })
    }
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
          <NavItem icon={<Home size={20} />} label="Discover" href="/" active={pathname === '/home' || pathname==='/'}  />
          <NavItem icon={<Users size={20} />} label="Authors" href="/authors" active={pathname==='/authors'}  />
          <NavItem icon={<Settings size={20} />} label="Settings" href="/settings"  active={pathname === '/settings'}/>
        </div>

        <div className="mt-auto pt-6 border-t border-bookly-cream/30">
          <div className="mb-6 flex flex-col gap-4">
            <NavItem
              icon={<LibraryBig size={20} />}
              label="Add book"
              href="#"
              onClick={() => setShowAddBookModal(true)}
              active={false}
            />
            <NavItem
              icon={<UserPlus size={20} />}
              label="Add author"
              href="#"
              onClick={() => setShowAddAuthorModal(true)}
              active={false}
            />
          </div>
          
          <NavItem 
            icon={<LogOut size={20} />} 
            label="Log out" 
            href='#' 
            onClick={handleLogout} 
            active={false} 
          />
        </div>
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
        isLoading={isCreatingAuthor}
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