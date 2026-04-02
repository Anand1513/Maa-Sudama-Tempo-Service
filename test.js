import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log("Missing env vars");
  process.exit(1);
}

const supabase = createClient(url, key);

async function run() {
  console.log("Checking profiles table...");
  const { data, error } = await supabase.from('profiles').select('*');
  console.log("Data:", data);
  console.log("Error:", error);
}

run();
