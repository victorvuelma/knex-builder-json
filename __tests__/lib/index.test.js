const Knex = require('knex')

const { attachJsonQuery } = require('../../lib')

const knexClient = require('../util/database/sqlite')
const prepareDatabase = require('../util/database/table')

describe('Knex Json Query', () => {
  beforeAll(async () => prepareDatabase(knexClient))

  it('Should Attach to Knex', () => {
    const extend = jest.spyOn(Knex.QueryBuilder, 'extend')

    attachJsonQuery()

    expect(extend).toBeCalledTimes(1)
    expect(extend).toBeCalledWith('jsonQuery', expect.any(Function))
  })
})
