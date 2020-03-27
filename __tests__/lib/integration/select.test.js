const { attachJsonQuery } = require('../../../lib')

const knexClient = require('../../util/database/sqlite')
const prepareDatabase = require('../../util/database/table')

const { dummies } = require('../../util/entities')

describe('Select tests', () => {
  beforeAll(async () => {
    attachJsonQuery()

    await prepareDatabase(knexClient)
  })

  afterAll(async () => {
    knexClient.destroy()
  })

  it('Should return dummies id and name of dummy B', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: 2,
      },
      select: ['dummyId', 'dummyName'],
    })

    expect(dummyQuery).toMatchObject([
      {
        dummyId: dummies.dummyB.dummyId,
        dummyName: dummies.dummyB.dummyName,
      },
    ])
  })

  it('Should return dummies name of dummy C, D', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: [3, 4],
      },
      select: 'dummyName',
    })

    expect(dummyQuery).toMatchObject([
      {
        dummyName: dummies.dummyC.dummyName,
      },
      {
        dummyName: dummies.dummyD.dummyName,
      },
    ])
  })
})
