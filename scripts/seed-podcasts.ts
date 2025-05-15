import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedPodcasts() {
  try {
    // Read the SQL file
    const sqlPath = path.join(process.cwd(), 'supabase', 'migrations', '20240320000000_add_sample_podcasts.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', { sql })

    if (error) {
      console.error('Error seeding podcasts:', error)
      process.exit(1)
    }

    console.log('Successfully seeded podcasts!')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

seedPodcasts() 