import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gmfpnnudwzarmhkavhcr.supabase.co";
const supabaseAnonKey = "sb_publishable_wFB-AolpNzsy4AakLV0w9Q_NhbLllLP";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
