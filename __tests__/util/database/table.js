const entities = require('../entities')

const setupTables = async (knex) =>
  knex.schema
    .dropTable('dummies')
    .dropTable('foos')
    .createTable('dummies', (t) => {
      t.integer('dummyId')
      t.string('dummyName')

      t.datetime('date')
      t.datetime('createdAt')

      t.integer('valueA')
      t.integer('valueB')
    })
    .createTable('foos', (t) => {
      t.integer('dummyId').references('dummies.dummyId')

      t.integer('fooId')
      t.string('fooName')
    })

const populateEntities = async (knex) =>
  Object.entries(entities).map(async ([table, values]) =>
    knex(table).insert(Object.values(values))
  )

const prepareDatabase = async (knex) => {
  await setupTables(knex)

  await populateEntities(knex)
}

module.exports = prepareDatabase
