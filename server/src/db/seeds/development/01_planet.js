/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex.raw(`
    DELETE FROM planet;

    INSERT INTO planet (name, description, code, picture_url) VALUES 
    ('Tatooine', E'Tatooine is a sparsely inhabited circumbinary desert planet located in the galaxy\\\'s Outer Rim Territories.', 'XT-FOE-43', 'https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg'),
    ('Aargau', 'Aargau is a planet in the Zug system of the Core Worlds region, not far from Coruscant and the Corellian Run.', 'FN-BBA-22', 'https://static.wikia.nocookie.net/starwars/images/a/a9/Aargau.jpg'),
    ('Malastare', 'Malastare is the high-gravity homeworld of the quadrupedal Dug race, on the Hydian Way.', 'EM-PVA-98', 'https://static.wikia.nocookie.net/starwars/images/d/df/MalastareNEGAS.jpg');
  `)
};
