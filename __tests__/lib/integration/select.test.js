const { attachJsonQuery } = require('../../../lib')

const knexClient = require('../../util/database/sqlite')
const prepareDatabase = require('../../util/database/table')

const { dummies } = require('../../util/entities')

describe('Select tests', () => {
  beforeAll(async () => {
    attachJsonQuery()

    return prepareDatabase(knexClient)
  })

  afterAll(async () => {
    return knexClient.destroy()
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

  it('Should return dummies count', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      select: [
        {
          $count: ['dummyId as dummyCount', 'dummyName as nameCount'],
        },
      ],
      first: true,
    })

    expect(dummyQuery).toMatchObject({ dummyCount: 5, nameCount: 5 })
  })

  it('Should return dummies distinct valueA', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      select: [
        {
          $distinct: 'valueA',
        },
      ],
    })

    expect(dummyQuery).toMatchObject([
      { valueA: 10 },
      { valueA: 25 },
      { valueA: 68 },
      { valueA: 24 },
    ])
  })
})
