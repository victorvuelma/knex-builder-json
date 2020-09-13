const { attachJsonQuery } = require('../../../lib')

const knexClient = require('../../util/database/sqlite')
const prepareDatabase = require('../../util/database/table')

describe('Group tests', () => {
  beforeAll(async () => prepareDatabase(knexClient))

  beforeAll(() => attachJsonQuery())

  afterAll(async () => knexClient.destroy())

  it('Should return dummyCount groupBy valueA', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      select: [
        'valueA',
        {
          $count: 'dummyId as dummyCount',
        },
      ],
      group: ['valueA'],
    })

    expect(dummyQuery).toMatchObject([
      {
        dummyCount: 1,
        valueA: 10,
      },
      {
        dummyCount: 2,
        valueA: 24,
      },
      {
        dummyCount: 1,
        valueA: 25,
      },
      {
        dummyCount: 1,
        valueA: 68,
      },
    ])
  })
})
