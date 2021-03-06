exports.up = function(knex, Promise) {
	return knex.schema.dropTable('practicing');  
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('practicing', table=>{
		table.increments();
		table.integer('user_id').unsigned().index().notNullable().references('users.id').onDelete('CASCADE');
		table.string('language');
		table.integer('proficiency');
	}) 
};
