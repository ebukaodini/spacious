const knex = require('../knex');

function getAllCharacters() {
  return knex.raw(`
    SELECT id, name, description, picture_url AS "pictureUrl",
      (SELECT json_object_agg('name', name) FROM planets WHERE code = planet) AS planet
      FROM characters;
  `).then(result => {
    return result.rows
  })
}

function getSingleCharacter(id) {
  return knex.raw(`
    SELECT id, name, description, picture_url AS "pictureUrl",
      (SELECT json_object_agg('name', name) FROM planets WHERE code = planet) AS planet,
      (SELECT array_agg(name) FROM characters AS T2 WHERE T2."id" IN (1,2)) AS friends
      FROM characters AS T1 WHERE id = ${id} LIMIT 1;
  `).then(result => {
    return result.rows[0]
  })

  // SELECT array_agg(friends) FROM characters AS T3 WHERE T3."id" = T2."id"
}

function getLastAddedCharacter() {
  return knex.raw(`
    SELECT id, name, description, picture_url AS "pictureUrl",
      (SELECT json_object_agg('name', name) FROM planets WHERE code = planet) AS planet
      FROM characters ORDER BY id DESC LIMIT 1;
  `).then(result => {
    return result.rows[0]
  })
}

async function addCharacter({ name, description, planet, pictureUrl, friends }) {
  return knex.raw(`
    INSERT INTO characters (name, description, planet, picture_url, friends)
    VALUES (E'${name}', E'${description}', '${planet}', '${pictureUrl}', ?)
  `, [friends]).then(result => {
    if (result.rowCount === 1)
      return getLastAddedCharacter()
    else return false
  })
}

module.exports = {
  getAllCharacters,
  getSingleCharacter,
  addCharacter
};


// (SELECT COUNT(*) FROM characters WHERE planet = code) AS population,
// (SELECT json_agg(name) FROM character_friends WHERE planet = code LIMIT 3) as characters