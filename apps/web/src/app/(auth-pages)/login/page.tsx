'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [isEmailLogin, setIsEmailLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [_, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSsoLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to sign in with Google')
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-bookly-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bookly-brown mb-2">Welcome Back!</h1>
          <p className="text-gray-500">Sign in to continue reading</p>
        </div>

        <div className="space-y-6">
          {!isEmailLogin ? (
            <>
              <button
                onClick={handleSsoLogin}
                className="w-full flex items-center justify-center gap-3 p-3 border-2 border-bookly-cream rounded-xl hover:bg-bookly-cream/10 transition-colors"
              >
                <Image
                  src="/google-icon.svg" // Add this to your public folder
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span className="text-bookly-brown font-medium">Continue with Google</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-bookly-cream"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <button
                onClick={() => setIsEmailLogin(true)}
                className="w-full flex items-center justify-center gap-3 p-3 bg-bookly-orange text-white rounded-xl hover:bg-bookly-orange/90 transition-colors"
              >
                <Mail size={20} />
                <span>Continue with Email</span>
              </button>
            </>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-bookly-brown mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-bookly-cream rounded-xl focus:outline-none focus:border-bookly-orange"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bookly-brown mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-bookly-cream rounded-xl focus:outline-none focus:border-bookly-orange"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 p-3 bg-bookly-orange text-white rounded-xl hover:bg-bookly-orange/90 transition-colors"
              >
                <span>Sign In</span>
                <ArrowRight size={20} />
              </button>

              <button
                type="button"
                onClick={() => setIsEmailLogin(false)}
                className="w-full text-center text-bookly-brown hover:underline"
              >
                Back to all options
              </button>
            </form>
          )}
        </div>

        <p className="mt-8 text-center text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-bookly-orange hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}