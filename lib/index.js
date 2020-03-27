const Knex = require('knex')

const selectParser = require('./parser/select')
const whereParser = require('./parser/where')

const groupParser = require('./parser/group')

const queryHandler = (client, query) => {
  const { where, select, first, group } = query

  selectParser(select, client)
  whereParser(where, client)
  groupParser(group, client)

  if (first) {
    client.first()
  }

  return client
}

function attachJsonQuery() {
  Knex.QueryBuilder.extend('jsonQuery', function jsonQuery(query) {
    return queryHandler(this, query)
  })
}

module.exports = {
  attachJsonQuery,
}
