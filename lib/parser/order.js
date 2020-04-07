const handleSchema = (schema, knex) => {
  if (schema) {
    if (schema instanceof Object) {
      knex.orderBy(
        Object.entries(schema).map(([column, order]) => ({
          column,
          order,
        }))
      )
    } else {
      knex.orderBy(schema)
    }
  }
}

module.exports = handleSchema
