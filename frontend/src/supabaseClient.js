import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ukyyztckblvimdodmhbj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreXl6dGNrYmx2aW1kb2RtaGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMDg0MDksImV4cCI6MjA4ODY4NDQwOX0.Hck5mxoZyVVwaDJBLQrTYuaw-U_o1w0OF9fx1nXdiiI"

export const supabase = createClient(supabaseUrl, supabaseKey)