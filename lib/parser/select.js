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
    schema.forEach((value) => selectHandler(value, knex))
  } else if (schema instanceof Object) {
    Object.entries(schema).forEach(([modifier, value]) => {
      switch (modifier) {
        case '$c':
        case '$count':
          count(value, knex)
          break
        case '$d':
        case '$distinct':
          distinct(value, knex)
          break
        default:
          break
      }
    })
  } else {
    knex.select(schema)
  }
}

module.exports = (schema, client) => {
  if (!schema) {
    return client.select('*')
  }

  return selectHandler(schema, client)
}
