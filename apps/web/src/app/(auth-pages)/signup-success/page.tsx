'use client'

import { CheckCircle, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignupSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-bookly-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-bookly-brown mb-4">Registration Successful!</h1>
        
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Mail size={20} className="text-bookly-orange" />
            <p className="text-gray-700 font-medium">Verify your email</p>
          </div>
          <p className="text-gray-500">
            We've sent a verification link to your email address. 
            Please check your inbox and click the link to activate your account.
          </p>
        </div>
        
        <button
          onClick={() => router.push('/login')}
          className="w-full p-3 bg-bookly-orange text-white rounded-xl hover:bg-bookly-orange/90 transition-colors"
        >
          Go to Login
        </button>
        
        <p className="mt-6 text-sm text-gray-500">
          Didn't receive an email? Check your spam folder or{' '}
          <button 
            className="text-bookly-orange hover:underline"
            onClick={() => router.push('/signup')}
          >
            try signing up again
          </button>
        </p>
      </div>
    </div>
  )
}