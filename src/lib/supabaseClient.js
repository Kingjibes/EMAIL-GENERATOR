import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ciomhixnswddtorvrfzi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpb21oaXhuc3dkZHRvcnZyZnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MTc2ODUsImV4cCI6MjA2MzI5MzY4NX0.m5YDU_6TqicL3DKt9asx1oGFhi2Ga0e5eT8YVkjTEtk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);