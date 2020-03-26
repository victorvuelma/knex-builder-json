const createTables = knex => {
  return knex.schema.createTable("dummies", t => {
    t.integer("dummyId");
    t.string("dummyName");

    t.datetime("date");
    t.datetime("createdAt");

    t.integer("valueA");
    t.integer("valueB");
  });
};

const dropTables = knex => {
  return knex.schema.dropTable("dummies");
};

module.exports = {
  createTables,
  dropTables
};
