'use client'
// src/components/layouts/ClientLayout.tsx
import { useAuth } from "@/components/providers/AuthProvider";
import Navbar from '@/components/layouts/Navbar';
import TopBar from '@/components/layouts/TopBar';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bookly-bg">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Auth pages or non-authenticated users get minimal layout
  if (isAuthPage || !user) {
    return (
      <main className="min-h-screen bg-bookly-bg">
        {children}
      </main>
    );
  }

  // Authenticated users get full layout
  return (
    <div className="flex h-screen bg-bookly-cream">
      <Navbar />
      <div className="flex-1 flex flex-col p-8">
        <TopBar />
        <main className="flex-1 p-8 bg-white rounded-3xl overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}