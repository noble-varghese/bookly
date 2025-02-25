import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const CACHE_KEY = 'userDetails';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedUserDetails {
    name: string;
    email: string;
    avatarUrl: string;
    timestamp: number;
}

export const getUserDetails = async () => {
    const supabase = createClientComponentClient();
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
        const parsed: CachedUserDetails = JSON.parse(cachedData);
        const isValid = Date.now() - parsed.timestamp < CACHE_DURATION;

        if (isValid) {
            return {
                name: parsed.name,
                email: parsed.email,
                avatarUrl: parsed.avatarUrl,
            };
        } else {
            localStorage.removeItem(CACHE_KEY);
        }
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
        const avatarUrl = user.user_metadata?.avatar_url || null;
        const email = user.email || '';
        const newUserDetails = { name, email, avatarUrl, timestamp: Date.now() };
        localStorage.setItem(CACHE_KEY, JSON.stringify(newUserDetails));

        return newUserDetails;
    }

    return null;
};

export const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
}