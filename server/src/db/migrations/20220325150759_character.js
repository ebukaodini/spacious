/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS character;
    CREATE TABLE character(
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(20) NOT NULL,
      description VARCHAR(300) NOT NULL,
      picture_url TEXT NOT NULL,
      planet VARCHAR(9) NOT NULL,
      CONSTRAINT fk_planet FOREIGN KEY(planet) REFERENCES planet(code)
    )
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw(`
    DROP TABLE character;
  `)
};
