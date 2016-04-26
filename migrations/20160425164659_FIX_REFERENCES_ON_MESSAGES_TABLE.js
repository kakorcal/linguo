exports.up = function(knex, Promise) {
	return knex.schema.table('messages', (table)=>{
		table.dropColumn('rec_id');
		table.dropColumn('sender_id');
	})  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('messages', (table)=>{
		table.integer('rec_id').notNullable().index().references('users.id');
		table.integer('sender_id').notNullable().index().references('users.id');
	})  
};
