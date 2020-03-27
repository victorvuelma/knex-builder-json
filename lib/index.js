const Knex = require('knex')

const selectParser = require('./parser/select')
const whereParser = require('./parser/where')

const groupParser = require('./parser/group')
const joinParser = require('./parser/join')

function attachJsonQuery() {
  Knex.QueryBuilder.extend('jsonQuery', function jsonQuery(
    query,
    settings = {}
  ) {
    const { where, select, first, group, join } = query
    const { joinSettings } = settings

    selectParser(select, this)
    whereParser(where, this)
    groupParser(group, this)
    joinParser(join, joinSettings, this)

    if (first) {
      this.first()
    }

    return this
  })
}

module.exports = {
  attachJsonQuery,
}
