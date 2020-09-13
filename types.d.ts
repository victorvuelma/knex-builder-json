import { QueryBuilder as knexQueryBuilder } from 'knex'

declare module 'knex' {
  interface QueryBuilder {
    jsonQuery(query, settings): knexQueryBuilder
  }
}

export function attachJsonQuery(): void
