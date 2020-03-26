const Knex = require("knex");

const selectParser = require("./parser/select");
const whereParser = require("./parser/where");

const queryHandler = (client, object) => {
  const { where, select } = object;

  selectParser(select, client);
  whereParser(where, client);

  return client;
};

const attachJsonQuery = () => {
  Knex.QueryBuilder.extend("jsonQuery", function jsonQuery(object) {
    return queryHandler(this, object);
  });
};

module.exports = {
  attachJsonQuery
};
