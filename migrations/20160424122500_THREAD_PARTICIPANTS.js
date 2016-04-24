exports.up = function(knex, Promise) {
  return knex.schema.createTable('thread_participants', table => {
    table.increments();
    table.integer('thread_id').unsigned().index().notNullable().references('threads.id');
    table.integer('user_id').unsigned().index().notNullable().references('users.id');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('thread_participants');
};
