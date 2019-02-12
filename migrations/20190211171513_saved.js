
exports.up = async function(knex) {
  await knex.schema.createTable("saved", table => {
    table.increments("id");
    table.integer("userId").notNullable();
    table.string("articleId").notNullable();
    table.json("article");
    table.unique(["userId", "articleId"]);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("saved");
};
