import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://medwohwrhxdxlsxmbvdg.supabase.co';
const supabaseAnonKey = 'sb_publishable_CJUx1qluBQ4ZSKoSS26NrQ_gKbJcwCD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);