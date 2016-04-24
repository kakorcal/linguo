
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert(
    {
    	id: 1, 
    	google_id: 'google_id_of_1',
    	username: 'Thomas',
    	location: 'Seattle',
    	gender: 'male',
    	age: 24,
    	img_url: 'lorempixel.com/200/200',
    	description: 'I am here to test this app out!'
    }),

    knex('users').insert(
    {
    	id: 2, 
    	google_id: 'google_id_of_2',
    	username: 'Dumbledore',
    	location: 'Hogwarts',
    	gender: 'male',
    	age: 153,
    	img_url: 'lorempixel.com/200/200',
    	description: 'I am here to learn a new language!'
    }),
    knex('users').insert(
    {
    	id: 3, 
    	google_id: 'google_id_of_3',
    	username: 'Homer',
    	location: 'Springfield',
    	gender: 'male',
    	age: 46,
    	img_url: 'lorempixel.com/200/200',
    	description: "D'oh!"
    })
  );
};
