
exports.up = async function(knex) {
  await knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password");
    table.string("name");
    table.index("username");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("users");
};
