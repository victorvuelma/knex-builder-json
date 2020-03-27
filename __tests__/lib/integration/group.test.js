const { attachJsonQuery } = require('../../../lib')

const knexClient = require('../../util/database/sqlite')
const prepareDatabase = require('../../util/database/table')

describe('Select tests', () => {
  beforeAll(async () => {
    attachJsonQuery()

    await prepareDatabase(knexClient)
  })

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
