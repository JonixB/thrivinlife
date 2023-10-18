import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_THRIVIN_LIFE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.REACT_APP_THRIVIN_LIFE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);