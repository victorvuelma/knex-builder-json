const entities = require('../entities')

const setupTables = async (knex) =>
  knex.schema.dropTableIfExists('dummies').createTable('dummies', (t) => {
    t.integer('dummyId')
    t.string('dummyName')

    t.datetime('date')
    t.datetime('createdAt')

    t.integer('valueA')
    t.integer('valueB')
  })

const populateEntities = async (knex) => {
  Object.entries(entities).forEach(async ([table, values]) => {
    await knex(table).insert(Object.values(values))
  })
}

const prepareDatabase = async (knex) => {
  await setupTables(knex)

  await populateEntities(knex)
}

module.exports = prepareDatabase
