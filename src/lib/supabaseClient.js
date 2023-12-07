import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API;

/**
 * Creates a Supabase client object.
 *
 * @param {string} supabaseUrl - The URL of the Supabase server.
 * @param {string} supabaseKey - The API key for accessing the Supabase server.
 * @returns {Object} A Supabase client object.
 */
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
