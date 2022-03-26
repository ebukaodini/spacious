/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS character_friends;

    CREATE TABLE character_friends (
      character_id INTEGER,
      friends_id INTEGER[],
      PRIMARY KEY (character_id, friends_id),
      CONSTRAINT fk_character FOREIGN KEY(character_id) REFERENCES character(id)
    );
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw(`
    DROP TABLE character_friends;
  `)
};
