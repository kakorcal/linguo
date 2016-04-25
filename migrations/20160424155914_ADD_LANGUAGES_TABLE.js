exports.up = function(knex, Promise) {
  return knex.schema.createTable('languages', table=>{
  	table.increments();
  	table.integer('user_id');
  	table.string('languages');
  	table.integer('proficiency');
  	table.string('approach');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('languages');
};
