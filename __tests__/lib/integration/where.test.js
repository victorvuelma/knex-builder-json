const { attachJsonQuery } = require('../../../lib')

const knexClient = require('../../util/database/sqlite')
const prepareDatabase = require('../../util/database/table')

const { dummies } = require('../../util/entities')

describe('Where tests', () => {
  beforeAll(async () => {
    attachJsonQuery()

    return prepareDatabase(knexClient)
  })

  afterAll(async () => {
    return knexClient.destroy()
  })

  it('Should return dummy with dummyId 1', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: 1,
      },
    })
    expect(dummyQuery).toMatchObject([dummies.dummyA])
  })

  it('Should return dummies with dummyId [2, 3]', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: [2, 3],
      },
    })
    expect(dummyQuery).toMatchObject([dummies.dummyB, dummies.dummyC])
  })

  it('Should return dummy with dummyId gt 2 and lt 4', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: {
          $gt: 2,
          $lt: 4,
        },
      },
    })
    expect(dummyQuery).toMatchObject([dummies.dummyC])
  })

  it('Should return dummies with dummyId gte to 1 and lte to 3', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: {
          $gte: 1,
          $lte: 3,
        },
      },
    })

    expect(dummyQuery).toMatchObject([
      dummies.dummyA,
      dummies.dummyB,
      dummies.dummyC,
    ])
  })

  it('Should return dummies with dummyId [1, 3] or dummyName Dummy B', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: { $in: [1, 3] },
        $or: { dummyName: 'Dummy B' },
      },
    })

    expect(dummyQuery).toMatchObject([
      dummies.dummyA,
      dummies.dummyB,
      dummies.dummyC,
    ])
  })

  it('Should return dummies with dummyId 5 and dummyName Dummy E', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: { $eq: 5 },
        $and: { dummyName: 'Dummy E' },
      },
    })

    expect(dummyQuery).toMatchObject([dummies.dummyE])
  })

  it('Should return no dummies. dummyId = null', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: null,
      },
    })

    expect(dummyQuery).toMatchObject([])
  })

  it('Should return all dummies. dummyId not null null', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: { $not: null },
      },
    })

    expect(dummyQuery).toMatchObject([
      dummies.dummyA,
      dummies.dummyB,
      dummies.dummyC,
      dummies.dummyD,
      dummies.dummyE,
    ])
  })

  it('Should return dummies with dummyName like A or E', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyName: { $like: '%A%' },
        $or: {
          dummyName: { $like: '%E%' },
        },
      },
    })

    expect(dummyQuery).toMatchObject([dummies.dummyA, dummies.dummyE])
  })

  it('Should return dummy with valueA 24 and not dummyId 5', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        valueA: 24,
        $not: {
          dummyId: 5,
        },
      },
    })

    expect(dummyQuery).toMatchObject([dummies.dummyD])
  })

  it('Should return dummy with valueA not 24', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        valueA: { $not: 24 },
      },
    })

    expect(dummyQuery).toMatchObject([
      dummies.dummyA,
      dummies.dummyB,
      dummies.dummyC,
    ])
  })

  it('Should return no dummies', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      where: {
        dummyId: [],
        dummyName: { $iO: 'invalidOperator' },
      },
    })

    expect(dummyQuery).toMatchObject([])
  })
})
