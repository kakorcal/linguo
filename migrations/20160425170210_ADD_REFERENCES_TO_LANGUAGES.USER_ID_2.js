exports.up = function(knex, Promise) {
	return knex.schema.table('languages', (table)=>{
		table.string('language');
		table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('languages', (table)=>{
		table.dropColumn('language');
		table.dropColumn('user_id');
	})
};