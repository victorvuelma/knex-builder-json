const buildOperators = require("./operators");

const handleSchema = (schema, knex) => {
  const operatorHandler = buildOperators(knex);

  Object.entries(schema).forEach(([columnOrOperator, elementSchema]) => {
    // $and $or $not, query operators
    switch (columnOrOperator) {
      case "$and":
        knex.andWhere(where => handleSchema(elementSchema, where));
        break;
      case "$or":
        knex.orWhere(where => handleSchema(elementSchema, where));
        break;
      case "$not":
        knex.orNot(where => handleSchema(elementSchema, where));
        break;
    }

    if (Array.isArray(elementSchema)) {
      //Array value, use $in operator
      operatorHandler.bind("$in", columnOrOperator, elementSchema);
    } else if (elementSchema instanceof Object) {
      // Object, expand operators
      Object.entries(elementSchema).forEach(([operator, value]) => {
        operatorHandler.bind(operator, columnOrOperator, value);
      });
    } else {
      operatorHandler.bind("$eq", columnOrOperator, elementSchema);
    }
  });
};

module.exports = handleSchema;
