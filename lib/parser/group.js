const handleSchema = (schema, knex) => {
  if (schema) {
    knex.groupBy(schema)
  }
}

module.exports = handleSchema
