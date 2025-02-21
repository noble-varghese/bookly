'use client'
import { Home, BookMarked, Crown, Users, Settings, LogOut, BookmarkCheckIcon, HeartPulseIcon, BookHeart, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import AddBookModal from '../modals/AddBookModal'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false)

  const handleAddBook = async () => {
    setShowAddBookModal(false);
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
            label="Add Book"
            href="#"
            onClick={() => setShowAddBookModal(true)}
          />
          <NavItem icon={<Settings size={20} />} label="Settings" href="/pages/settings" />
        </div>

        <NavItem icon={<LogOut size={20} />} label="Log out" href="/logout" />
      </nav>

      <AddBookModal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        onSubmit={handleAddBook}
      />
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