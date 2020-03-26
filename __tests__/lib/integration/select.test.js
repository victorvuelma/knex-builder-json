const { attachJsonQuery } = require("../../../lib");

const dbClient = require("../../util/dbClient");
const { createTables, dropTables } = require("../../util/tables");
const entities = require("../../util/entities");
const { dummies } = entities;

const populate = async () => {
  await dropTables(dbClient);
  await createTables(dbClient);

  Object.entries(entities).forEach(async ([table, values]) => {
    await dbClient(table).insert(Object.values(values));
  });
};

describe("Select tests", () => {
  beforeAll(async () => {
    attachJsonQuery();

    await populate();
  });

  it("Should return dummies id and name of dummy B", async () => {
    const dummyQuery = await dbClient("dummies").jsonQuery({
      where: {
        dummyId: 2
      },
      select: ["dummyId", "dummyName"]
    });

    expect(dummyQuery).toMatchObject([
      {
        dummyId: dummies.dummyB.dummyId,
        dummyName: dummies.dummyB.dummyName
      }
    ]);
  });

  it("Should return dummies name of dummy C, D", async () => {
    const dummyQuery = await dbClient("dummies").jsonQuery({
      where: {
        dummyId: [3, 4]
      },
      select: "dummyName"
    });

    expect(dummyQuery).toMatchObject([
      {
        dummyName: dummies.dummyC.dummyName
      },
      {
        dummyName: dummies.dummyD.dummyName
      }
    ]);
  });
});
