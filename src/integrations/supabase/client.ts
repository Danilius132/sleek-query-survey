// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fnwlgafktvybdylmjrkh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZud2xnYWZrdHZ5YmR5bG1qcmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5OTAwMjUsImV4cCI6MjA0ODU2NjAyNX0.OMym0wn2XOW1102ZueXUUlG3tFIm7tXj2cI7ogg9XMs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);