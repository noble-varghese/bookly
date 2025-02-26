import { SupabaseClient } from "@supabase/supabase-js";
export declare class SupabaseClientInit {
    private static instance;
    private constructor();
    static getInstance(): SupabaseClient;
    static init(): void;
}
export declare const supabase: SupabaseClient<any, "public", any>;
