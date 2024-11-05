/* eslint-env node */

import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase URL or Key in environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

const logStep = stepMessage => {
  console.log(stepMessage)
}

const seedProjects = async numEntries => {
  logStep(`Seeding projects...`)
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

  const { data, error } = await supabase
    .from('projects')
    .insert(projects)
    .select('id')

  if (error) return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully!')

  return data
}

const seedDatabase = async numEntriesPerTable => {
  await seedProjects(numEntriesPerTable)
}

const numEntriesPerTable = 10
seedDatabase(numEntriesPerTable)
