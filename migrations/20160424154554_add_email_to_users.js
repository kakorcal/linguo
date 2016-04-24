exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.string('email').notNullable();
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('email');
  });
};
