class SelectOperators {
  constructor(knex) {
    this.knex = knex
  }

  distinctOperator(value) {
    if (Array.isArray(value)) {
      return value.forEach((val) => this.distinctOperator(val))
    }
    return this.knex.distinct(value)
  }

  countOperator(value) {
    if (Array.isArray(value)) {
      return value.forEach((val) => this.countOperator(val))
    }
    return this.knex.count(value)
  }

  bind(op, column, value) {
    const operators = {
      count: this.countOperator,
      distinct: this.distinctOperator,

      $c: this.countOperator,
      $count: this.countOperator,
      $d: this.distinctOperator,
      $distinct: this.distinctOperator,
    }

    const operator = operators[op]
    if (operator) {
      operator.call(this, column, value)
    }
  }
}

module.exports = (knex) => new SelectOperators(knex)
