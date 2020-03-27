const Knex = require('knex')

const { attachJsonQuery } = require('../../lib')

describe('Knex Json Query', () => {
  it('Should Attach to Knex', () => {
    const extend = jest.spyOn(Knex.QueryBuilder, 'extend')

    attachJsonQuery()

    expect(extend).toBeCalledTimes(1)
    expect(extend).toBeCalledWith('jsonQuery', expect.any(Function))
  })
})
