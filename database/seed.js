/* eslint-env node */

import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase URL or Key in environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const seedProjects = async (numEntries) => {
  const projects = []
  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    projects.push({
      name: name,
      slug: faker.helpers.slugify(name),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5]),
    })
  }

  await supabase.from('projects').insert(projects)
}

await seedProjects(10)
