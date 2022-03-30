/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  return knex.raw(`
    DELETE FROM characters;

    INSERT INTO characters (name, description, planet, picture_url) VALUES 
    ('Chewbacca', 'Chewbacca, known affectionately to his friends as Chewie, is a Wookiee male warrior, smuggler, mechanic, pilot, and resistance fighter.', 'FN-BBA-22', 'https://image.shutterstock.com/image-photo/cannes-france-may-15-chewbacca-600w-1123987313.jpg'),
    ('Norbert Ériu', 'Norbert is a farmer.', 'FN-BBA-22', 'https://images.unsplash.com/photo-1588422333078-44ad73367bcb'),
    ('Sümeyye Sitora', 'Sümeyye is a teacher.', 'FN-BBA-22', 'https://images.unsplash.com/photo-1606103955054-99913abd77c8'),
    ('Cori Blagovesta', 'Cori is known as the most teasing person in the galaxy.', 'XT-FOE-43', 'https://images.unsplash.com/photo-1530071100468-90954e4921d0'),
    ('Nisha Amala', 'Nisha is curious about what happens in the Outer Rim', 'XT-FOE-43', 'https://images.unsplash.com/photo-1592210566091-9e18a5fc01b4'),
    ('Spyro Gerarda', 'Spyro is Spyro', 'EM-PVA-98', 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc');
  `)
};
