exports.up = function(knex, Promise) {
  return knex.schema.table('messages', table => {
    table.integer('rec_id').unsigned().index().notNullable().references('users.id');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('messages', table =>{
  	table.dropColumn('rec_id');
  })
};
