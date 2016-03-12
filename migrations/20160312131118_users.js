exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table){
    table.increments().primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('email');
    table.string('username', 20);
    table.string('google_id');
    table.string('photo_url', 500);
    table.text('personal_info');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
