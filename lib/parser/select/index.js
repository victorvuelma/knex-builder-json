const buildOperators = require('./operators')

const handleSchema = (schema, knex) => {
  const operators = buildOperators(knex)

  if (Array.isArray(schema)) {
    schema.forEach((value) => handleSchema(value, knex))
  } else if (schema instanceof Object) {
    Object.entries(schema).forEach(([operator, value]) => {
      operators.bind(operator, value)
    })
  } else {
    knex.select(schema)
  }
}

module.exports = (schema, client) => {
  if (!schema) {
    return client.select('*')
  }

  return handleSchema(schema, client)
}
