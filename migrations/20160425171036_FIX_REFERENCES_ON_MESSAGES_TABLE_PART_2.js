exports.up = function(knex, Promise) {
	return knex.schema.table('messages', (table)=>{
		table.integer('rec_id').notNullable().index();
		table.integer('sender_id').notNullable().index();
	})  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('messages', (table)=>{
		table.dropColumn('rec_id');
		table.dropColumn('sender_id');
	})  
};
