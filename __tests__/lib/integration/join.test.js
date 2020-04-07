const { attachJsonQuery } = require('../../../lib')

const knexClient = require('../../util/database/sqlite')

const { foos } = require('../../util/entities')

describe('Join tests', () => {
  beforeAll(() => attachJsonQuery())

  afterAll(async () => knexClient.destroy())

  it('Should return foos from dummies using Join', async () => {
    const dummyQuery = await knexClient('dummies').jsonQuery(
      {
        where: {
          'dummies.dummyId': 2,
        },
        select: ['foos.fooId', 'foos.fooName'],
        join: ['foos'],
      },
      {
        joinSettings: {
          foos: {
            join: (knex) => {
              knex.innerJoin('foos', 'dummies.dummyId', 'foos.dummyId')
            },
          },
        },
      }
    )

    expect(dummyQuery).toMatchObject([
      {
        fooId: foos.fooC.fooId,
        fooName: foos.fooC.fooName,
      },
      {
        fooId: foos.fooD.fooId,
        fooName: foos.fooD.fooName,
      },
    ])
  })

  it('Should throw error with no join settings', async () => {
    expect(() =>
      knexClient('dummies').jsonQuery({
        join: ['foos'],
      })
    ).toThrow()
  })

  it('Should throw error with no join setting for foo table', async () => {
    expect(() =>
      knexClient('dummies').jsonQuery(
        {
          join: ['foos'],
        },
        {
          joinSettings: {},
        }
      )
    ).toThrow()
  })
})
