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

  it('Should return dummies distinct valueA and valueB', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      select: [
        {
          $distinct: ['valueA', 'valueB'],
        },
      ],
    })

    expect(dummyQuery).toMatchObject([
      { valueA: 10, valueB: 85 },
      { valueA: 25, valueB: 16 },
      { valueA: 68, valueB: 16 },
      { valueA: 24, valueB: 23 },
      { valueA: 24, valueB: 56 },
    ])
  })

  it('Should return all fields (invalid op) from dummy with dummyId 1', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: 1,
      },
      select: [
        {
          $io: 'invalidOp',
        },
      ],
      first: true,
    })

    expect(dummyQuery).toMatchObject(dummies.dummyA)
  })
})
