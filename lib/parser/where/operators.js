class WhereOperators {
  constructor(knex) {
    this.knex = knex
  }

  relationalOperator(column, operator, value) {
    return this.knex.where(column, operator, value)
  }

  equalOperator(column, value) {
    if (value === null) {
      return this.knex.whereNull(column)
    }

    return this.knex.where(column, value)
  }

  notOperator(column, value) {
    if (value === null) {
      return this.knex.whereNotNull(column)
    }

    return this.knex.whereNot(column, value)
  }

  inOperator(column, value) {
    if (value.length) {
      return this.knex.whereIn(column, value)
    }

    return this.knex.whereNotNull(column).andWhere(column, null)
  }

  likeOperator(column, value) {
    return this.relationalOperator(column, 'like', value)
  }

  greaterThanOperator(column, value) {
    return this.relationalOperator(column, '>', value)
  }

  greaterThanOrEqualOperator(column, value) {
    return this.relationalOperator(column, '>=', value)
  }

  lowerThanOperator(column, value) {
    return this.relationalOperator(column, '<', value)
  }

  lowerThanOrEqualOperator(column, value) {
    return this.relationalOperator(column, '<=', value)
  }

  bind(op, column, value) {
    const operators = {
      eq: this.equalOperator,
      not: this.notOperator,
      in: this.inOperator,
      like: this.likeOperator,
      gt: this.greaterThanOperator,
      gte: this.greaterThanOrEqualOperator,
      lt: this.lowerThanOperator,
      lte: this.lowerThanOrEqualOperator,

      $eq: this.equalOperator,
      $not: this.notOperator,
      $in: this.inOperator,
      $like: this.likeOperator,
      $gt: this.greaterThanOperator,
      $gte: this.greaterThanOrEqualOperator,
      $lt: this.lowerThanOperator,
      $lte: this.lowerThanOrEqualOperator,
    }

    const operator = operators[op]
    if (operator) {
      operator.call(this, column, value)
    }
  }
}

module.exports = (knex) => new WhereOperators(knex)
