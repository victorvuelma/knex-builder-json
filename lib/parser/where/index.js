const buildOperators = require('./operators')

const handleSchema = (schema, knex) => {
  if (schema) {
    const operatorHandler = buildOperators(knex)

    Object.entries(schema).forEach(([columnOrOperator, elementSchema]) => {
      // $and $or $not, query operators
      switch (columnOrOperator) {
        case '$and':
          return knex.andWhere((wb) => handleSchema(elementSchema, wb))
        case '$or':
          return knex.orWhere((wb) => handleSchema(elementSchema, wb))
        case '$not':
          return knex.whereNot((wb) => handleSchema(elementSchema, wb))
        default:
          break
      }

      if (Array.isArray(elementSchema)) {
        // Array value, use $in operator
        return operatorHandler.bind('$in', columnOrOperator, elementSchema)
      }
      if (elementSchema instanceof Object) {
        // Object, expand operators
        return Object.entries(elementSchema).forEach(([operator, value]) => {
          operatorHandler.bind(operator, columnOrOperator, value)
        })
      }
      return operatorHandler.bind('$eq', columnOrOperator, elementSchema)
    })
  }
}

module.exports = handleSchema
