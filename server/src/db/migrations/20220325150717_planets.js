/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS planets;
    CREATE TABLE planets(
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(20) NOT NULL,
      description VARCHAR(300) NOT NULL,
      code VARCHAR(9) UNIQUE NOT NULL,
      picture_url TEXT NOT NULL
    );
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw(`
    DROP TABLE planets;
  `)
};
