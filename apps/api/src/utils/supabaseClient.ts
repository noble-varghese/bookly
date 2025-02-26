import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { logger } from "./logger";

export class SupabaseClientInit {
    private static instance: SupabaseClient;

    private constructor() {}

    public static getInstance(): SupabaseClient {
        if (!SupabaseClientInit.instance) {
            if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
                throw new Error('Supabase URL and Service Role Key must be defined');
            }

            SupabaseClientInit.instance = createClient(
                process.env.SUPABASE_URL, 
                process.env.SUPABASE_SERVICE_ROLE_KEY
            );
        }

        return SupabaseClientInit.instance;
    }

    public static init() {
        if (!SupabaseClientInit.instance) {
            if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
                throw new Error('Supabase URL and Service Role Key must be defined');
            }

            SupabaseClientInit.instance = createClient(
                process.env.SUPABASE_URL, 
                process.env.SUPABASE_SERVICE_ROLE_KEY
            );
        }
        logger.info('Supabase initialised...')
    }
}

export const supabase = SupabaseClientInit.getInstance();