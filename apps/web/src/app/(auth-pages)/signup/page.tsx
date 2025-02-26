'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'

export default function SignupPage() {
  const [isEmailSignup, setIsEmailSignup] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSsoSignup = async (): Promise<void> => {
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
      setError('Failed to sign up with Google')
    }
  }

  const handleEmailSignup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          },
          emailRedirectTo: `${location.origin}/auth/callback`
        }
      })

      if (error) throw error

      // Show success message or redirect to success page
      router.push('/signup-success')
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to create account')
    }
  }

  return (
    <div className="min-h-screen bg-bookly-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bookly-brown mb-2">Create an Account</h1>
          <p className="text-gray-500">Join our reading community</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {!isEmailSignup ? (
            <>
              <button
                onClick={handleSsoSignup}
                className="w-full flex items-center justify-center gap-3 p-3 border-2 border-bookly-cream rounded-xl hover:bg-bookly-cream/10 transition-colors"
              >
                <Image
                  src="/google-icon.svg" 
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span className="text-bookly-brown font-medium">Sign up with Google</span>
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
                onClick={() => setIsEmailSignup(true)}
                className="w-full flex items-center justify-center gap-3 p-3 bg-bookly-orange text-white rounded-xl hover:bg-bookly-orange/90 transition-colors"
              >
                <Mail size={20} />
                <span>Sign up with Email</span>
              </button>
            </>
          ) : (
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-bookly-brown mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border text-bookly-textInput border-bookly-cream rounded-xl focus:outline-none focus:border-bookly-orange"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

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
                    className="w-full pl-10 pr-4 py-2 border text-bookly-textInput border-bookly-cream rounded-xl focus:outline-none focus:border-bookly-orange"
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
                    className="w-full pl-10 pr-4 py-2 border text-bookly-textInput border-bookly-cream rounded-xl focus:outline-none focus:border-bookly-orange"
                    placeholder="Create a password"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bookly-brown mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border text-bookly-textInput border-bookly-cream rounded-xl focus:outline-none focus:border-bookly-orange"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="text-sm text-gray-500">
                By signing up, you agree to our{' '}
                <a href="/terms" className="text-bookly-orange hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-bookly-orange hover:underline">
                  Privacy Policy
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 p-3 bg-bookly-orange text-white rounded-xl hover:bg-bookly-orange/90 transition-colors"
              >
                <span>Create Account</span>
                <ArrowRight size={20} />
              </button>

              <button
                type="button"
                onClick={() => setIsEmailSignup(false)}
                className="w-full text-center text-bookly-brown hover:underline"
              >
                Back to all options
              </button>
            </form>
          )}
        </div>

        <p className="mt-8 text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-bookly-orange hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}