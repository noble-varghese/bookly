"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = exports.SupabaseClientInit = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const logger_1 = require("./logger");
class SupabaseClientInit {
    constructor() { }
    static getInstance() {
        if (!SupabaseClientInit.instance) {
            if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
                throw new Error('Supabase URL and Service Role Key must be defined');
            }
            SupabaseClientInit.instance = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        }
        return SupabaseClientInit.instance;
    }
    static init() {
        if (!SupabaseClientInit.instance) {
            if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
                throw new Error('Supabase URL and Service Role Key must be defined');
            }
            SupabaseClientInit.instance = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        }
        logger_1.logger.info('Supabase initialised...');
    }
}
exports.SupabaseClientInit = SupabaseClientInit;
exports.supabase = SupabaseClientInit.getInstance();
