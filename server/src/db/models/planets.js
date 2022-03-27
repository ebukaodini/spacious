const knex = require('../knex');

function getAllPlanets() {
  return knex.raw(`
    SELECT id, name, description, code, picture_url AS "pictureUrl",
      (SELECT COUNT(*) FROM characters WHERE planet = code) AS population,
      (SELECT json_agg(id) FROM characters WHERE planet = code LIMIT 3) as characters
      FROM planets;
  `).then(result => {
    return result.rows
  })
}

function getLastAddedPlanet() {
  return knex.raw(`
    SELECT id, name, description, code, picture_url AS "pictureUrl",
      (SELECT COUNT(*) FROM characters WHERE planet = code) AS population,
      (SELECT json_agg(id) FROM characters WHERE planet = code LIMIT 3) as characters
      FROM planets ORDER BY id DESC LIMIT 1;
  `).then(result => {
    return result.rows[0]
  })
}

function generatePlanetCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const randomLetter = () => letters[Math.floor(Math.random() * 25) + 1];
  const randomNumber = () => Math.floor(Math.random() * 9) + 1;

  return `${randomLetter()}${randomLetter()}-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}${randomNumber()}`
}

function addPlanet({ name, description, pictureUrl }) {
  const code = generatePlanetCode()

  while (
    knex.raw(`
    SELECT code FROM planets WHERE code = '${code}';
  `).then(result => {
      return result.rowCount == 0
    }) === false
  ) {
    code = generatePlanetCode()
  }

  return knex.raw(`
    INSERT INTO planets (name, description, code, picture_url)
    VALUES (E'${name}', E'${description}', '${code}', '${pictureUrl}')
  `).then(result => {
    if (result.rowCount === 1)
      return getLastAddedPlanet()
    else return false
  })
}

module.exports = {
  getAllPlanets,
  addPlanet
};