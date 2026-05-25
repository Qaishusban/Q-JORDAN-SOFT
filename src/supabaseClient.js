import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mqolaoidkhtpmgvtnkcr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb2xhb2lka2h0cG1ndnRua2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MzIzNTUsImV4cCI6MjA5NTIwODM1NX0.SjSTucl_7c56RgCiMPGOkz99R9FhC_hysFLjR5KphDc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);