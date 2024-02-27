import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvbvudmtzmkgxyrgrarn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2YnZ1ZG10em1rZ3h5cmdyYXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5OTY2MzEsImV4cCI6MjAyNDU3MjYzMX0.ia19vrN46SH-le-9e4qZOhRBDBLJqGp4eusu9iDCq7c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);