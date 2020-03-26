module.exports = (schema, client) => {
  if (!schema) {
    return client.select("*");
  }

  if (Array.isArray(schema)) {
    return client.select(...schema);
  } else {
    return client.select(schema);
  }
};
