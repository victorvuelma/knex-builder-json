const Knex = require('knex')

const selectParser = require('./parser/select')
const whereParser = require('./parser/where')

const groupParser = require('./parser/group')

function attachJsonQuery() {
  Knex.QueryBuilder.extend('jsonQuery', function jsonQuery(query) {
    const { where, select, first, group } = query

    selectParser(select, this)
    whereParser(where, this)
    groupParser(group, this)

    if (first) {
      this.first()
    }
  })
}

module.exports = {
  attachJsonQuery,
}
