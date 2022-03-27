/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS characters;
    CREATE TABLE characters(
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(20) NOT NULL,
      description VARCHAR(300) NOT NULL,
      picture_url TEXT NOT NULL,
      planet VARCHAR(9) NOT NULL REFERENCES planets(code),
      friends INTEGER[]
    )
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw(`
    DROP TABLE characters;
  `)
};
