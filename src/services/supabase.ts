// services/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kkwbmavtlqxioxemiszw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrd2JtYXZ0bHF4aW94ZW1pc3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyNDc1NzMsImV4cCI6MjAxMjgyMzU3M30.yPWwN9QsjxCFrRQLOUNAFkM1er6Cj1Vf_NKGGsfL05U';
const supabaseClient = createClient(supabaseUrl, supabaseKey)

export const supabase = supabaseClient;
