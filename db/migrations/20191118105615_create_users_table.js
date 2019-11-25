
exports.up = function(knex) {
  return knex.schema.createTable('users', (usersTable) => {
      usersTable.string('username', 16).primary()
      usersTable.string('avatar_url')
      usersTable.string('name', 32).notNullable()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
