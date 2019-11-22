
exports.up = function(knex) {
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.string('slug', 32).primary()
    topicsTable.string('description').notNullable()
  })
};

exports.down = function(knex) {
    console.log('removing topics table...')
    return knex.schema.dropTable('topics')
};