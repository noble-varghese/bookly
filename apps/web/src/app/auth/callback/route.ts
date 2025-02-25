// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { UserService } from '@/services/api/userService'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      
      const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) throw sessionError

      if (session?.user) {
        const { user } = session

        console.log('====>>>>>>>>>>>>>>>>>>>>>>>>>.')
        console.log(user)
        const userExists = await UserService.checkUserExists(user.email!)

        if (!userExists) {
          await UserService.createUser({
            name: user.user_metadata.full_name || user.user_metadata.name || user.email!.split('@')[0],
            email: user.email!,
            avatarUrl: user.user_metadata?.avatar_url || ''
          })
        }
      }
    }

    return NextResponse.redirect(new URL('/home', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}