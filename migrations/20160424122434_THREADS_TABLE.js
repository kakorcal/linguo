exports.up = function(knex, Promise) {
  return knex.schema.createTable('threads', table => {
    table.increments();
    table.string('subject');
  });  
};

exports.down = function(knex, Promise) {
  return knex.dropTable('threads');
};
