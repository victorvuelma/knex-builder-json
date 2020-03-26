const Knex = require("knex");

const dbClient = Knex({
  client: "sqlite3",
  connection: {
    filename: "../database.sqlite"
  },
  useNullAsDefault: true
});

module.exports = dbClient;
