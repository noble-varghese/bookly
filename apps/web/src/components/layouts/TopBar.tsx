import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { supabase } from '@/lib/supabase'
import { getInitials, getUserDetails } from '@/lib/userDetailsUtils'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const categories = [
  { label: "All", href: "#" },
  { label: "Fantasy", href: "#" },
  { label: "Drama", href: "#" },
  { label: "Detective", href: "#" },
  { label: "Education", href: "#" },
  { label: "Psychology", href: "#" },
  { label: "Business", href: "#" },
  { label: "Astrology", href: "#" },
]

interface CachedUserDetails {
  name: string;
  email: string;
  avatarUrl: string;
  timestamp: number;
}

const TopBar = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    avatarUrl: ''
  })

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      console.log('======>>>>>>>>>>>>>>>>>>>>>', userDetails);
      if (userDetails) {
        setUserDetails(userDetails);
      }
    };
    fetchUserDetails();
  }, []);

  console.log('User Details:', userDetails);
  console.log('Avatar URL:', userDetails.avatarUrl);

  
  return (
    <div className="flex flex-col gap-4 pl-0 p-4 bg-bookly-cream">
      <div className="flex items-center justify-between">
        <div className="relative flex-grow max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookly-brown/60" size={20} />
          <input
            type="text"
            placeholder="Search name of the book or author..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-bookly-cream focus:outline-none focus:border-bookly-orange"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-2 ml-4">
          <Avatar>
            <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocLt7EBbzlasF-mRsKlNdCrAXM5MfEukWJUO9vm8PjDMGnlKZCY=s96-c"
              alt="Profile picture" />
            <AvatarFallback>{getInitials(userDetails.name)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-bookly-brown">{userDetails.name}</span>
        </div>
      </div>

      <div className="flex gap-4">
        {categories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="px-4 py-2 rounded-full text-bookly-brown hover:bg-bookly-orange hover:text-white transition-colors"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TopBar