const { attachJsonQuery } = require('../../../lib')

const knexClient = require('../../util/database/sqlite')

const { dummies } = require('../../util/entities')
const prepareDatabase = require('../../util/database/table')

describe('Select tests', () => {
  beforeAll(async () => prepareDatabase(knexClient))

  beforeAll(() => attachJsonQuery())

  afterAll(async () => knexClient.destroy())

  it('Should return dummies valueA orderBy valueB', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      select: ['valueA'],
      order: 'valueB',
    })

    expect(dummyQuery).toMatchObject([
      {
        valueA: dummies.dummyB.valueA,
      },
      {
        valueA: dummies.dummyC.valueA,
      },
      {
        valueA: dummies.dummyD.valueA,
      },
      {
        valueA: dummies.dummyE.valueA,
      },
      {
        valueA: dummies.dummyA.valueA,
      },
    ])
  })

  it('Should return dummies valueA orderBy valueB', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery({
      select: ['valueB'],
      order: {
        valueA: 'asc',
        valueB: 'desc',
      },
    })

    expect(dummyQuery).toMatchObject([
      {
        valueB: dummies.dummyA.valueB,
      },
      {
        valueB: dummies.dummyE.valueB,
      },
      {
        valueB: dummies.dummyD.valueB,
      },
      {
        valueB: dummies.dummyB.valueB,
      },
      {
        valueB: dummies.dummyC.valueB,
      },
    ])
  })
})
