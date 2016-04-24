
exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.renameColumn('username', 'name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.renameColumn('name', 'username');
  });
};
