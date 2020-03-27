module.exports = (schema, client) => {
  if (!schema) {
    return client.select('*')
  }

  if (Array.isArray(schema)) {
    return client.select(...schema)
  }
  return client.select(schema)
}
