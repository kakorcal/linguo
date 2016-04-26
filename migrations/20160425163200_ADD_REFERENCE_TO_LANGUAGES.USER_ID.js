exports.up = function(knex, Promise) {
	return knex.schema.table('languages', (table)=>{
		table.dropColumn('languages');
		table.dropColumn('user_id');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('languages', (table)=>{
		table.integer('user_id').references('users.id');
		table.string('languages');
	})
};