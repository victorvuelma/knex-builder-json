const distinct = (value, knex) => {
  if (Array.isArray(value)) {
    return value.forEach((val) => knex.distinct(val))
  }

  return knex.distinct(value)
}

const count = (value, knex) => {
  if (Array.isArray(value)) {
    return value.forEach((val) => knex.count(val))
  }

  return knex.count(value)
}

const selectHandler = (schema, knex) => {
  if (Array.isArray(schema)) {
    return schema.forEach((value) => selectHandler(value, knex))
  }
  if (schema instanceof Object) {
    Object.entries(schema).forEach(([modifier, value]) => {
      switch (modifier) {
        case '$c':
        case '$count':
          return count(value, knex)
        case '$d':
        case '$distinct':
          return distinct(value, knex)
        default:
          return knex
      }
    })
  }
  return knex.select(schema)
}

module.exports = (schema, client) => {
  if (!schema) {
    return client.select('*')
  }

  return selectHandler(schema, client)
}
