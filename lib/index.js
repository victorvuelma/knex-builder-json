const Knex = require('knex')

const selectParser = require('./parser/select')
const whereParser = require('./parser/where')

const groupParser = require('./parser/group')
const joinParser = require('./parser/join')
const orderParser = require('./parser/order')

function attachJsonQuery() {
  Knex.QueryBuilder.extend('jsonQuery', function jsonQuery(
    query,
    settings = {}
  ) {
    const { select, where, group, order, join, first, limit } = query
    const { joinSettings } = settings

    selectParser(select, this)
    whereParser(where, this)
    groupParser(group, this)
    orderParser(order, this)

    joinParser(join, joinSettings, this)

    if (first) {
      this.first()
    }
    if (limit) {
      this.limit(limit)
    }

    return this
  })
}

module.exports = {
  attachJsonQuery,
}
