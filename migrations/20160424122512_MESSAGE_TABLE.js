exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments();
    table.integer('thread_id').unsigned().index().notNullable().references('threads.id').onDelete('CASCADE');
    table.integer('sender_id').unsigned().index().notNullable().references('users.id');
    table.text('message');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });  
};

exports.down = function(knex, Promise) {
  
};
