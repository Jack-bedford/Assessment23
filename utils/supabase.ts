import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rbewnycfrggoquutcetn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiZXdueWNmcmdnb3F1dXRjZXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0ODExNjYsImV4cCI6MjA2MjA1NzE2Nn0.dv01535-ISACYHUuiSVUYMxQ-wIDfgVSYjZUJGhusc4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
