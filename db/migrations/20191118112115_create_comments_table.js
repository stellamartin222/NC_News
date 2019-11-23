
exports.up = function(knex) {
  return knex.schema.createTable('comments', (commentsTable) => {
      commentsTable.increments('comment_id').primary()
      commentsTable.string('author')
        .references('users.username')
        .onDelete('SET NULL')
      commentsTable.integer('article_id')
        .references('articles.article_id')
        .onDelete('CASCADE')
      commentsTable.integer('votes')
      .defaultTo(0)
      commentsTable.text('created_at')
        .defaultTo(knex.fn.now())
      commentsTable.text('body').notNullable()
  })
};

exports.down = function(knex) {
    console.log('removing comments table...')
    return knex.schema.dropTable('comments')
};
