
exports.up = function(knex) {
  return knex.schema.createTable('articles', (articlesTable) => {
       articlesTable.increments('article_id').primary()
       articlesTable.string('title').notNullable()
       articlesTable.text('body').notNullable()
       articlesTable.integer('votes')
       articlesTable.string('topic')
          .references('topics.slug')
          .onDelete('SET NULL')
       articlesTable.string('author')
          .references('users.username')
          .onDelete('SET NULL')
      articlesTable.text('created_at')
          //.defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  console.log('removing articles table...')
  return knex.schema.dropTable('articles')
};
