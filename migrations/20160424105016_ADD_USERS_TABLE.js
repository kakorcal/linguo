exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', table=>{
		table.increments();
		table.text('google_id');
		table.string('username');
		table.string('location');
		table.string('gender');
		table.integer('age');
		table.text('img_url');
		table.text('description');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
