const handleSchema = (schema, settings, knex) => {
  if (schema) {
    if (!settings) {
      throw new Error('No settings to join')
    }

    if (Array.isArray(schema)) {
      schema.forEach((s) => handleSchema(s, settings, knex))
    } else if (settings[schema]) {
      const schemaSettings = settings[schema]

      schemaSettings.join(knex)
    } else {
      throw new Error('Invalid join table')
    }
  }
}

module.exports = handleSchema
