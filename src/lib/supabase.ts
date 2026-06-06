import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://dvbxgfpfcnmermovftqc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2YnhnZnBmY25tZXJtb3ZmdHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzMzNzcsImV4cCI6MjA2NDc0OTM3N30.ayoAEGdK8Bv7e6407Fv3yPnzRbj390urWwZQGz-g3fk'
)