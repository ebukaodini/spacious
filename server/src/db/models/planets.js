const knex = require('../knex');

function getAllPlanets(pageSize, page) {

  let offset = (pageSize * page) - pageSize

  return knex.raw(`
    SELECT id, name, description, code, picture_url AS "pictureUrl",
      (SELECT COUNT(*) FROM characters WHERE planet = code) AS population,
      (SELECT array_agg(id) FROM characters WHERE planet = code LIMIT 3) as characters
      FROM planets ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset};
  `).then(async result => {
    const planets = result.rows;

    let index = 0;
    planets.forEach(row => {
      planets[index].characters = row?.characters?.map(character => ({ id: character }))
      index++;
    })

    return {
      pagination: {
        page, pageSize
      },
      nodes: planets
    }
  })
    .then(planets => {
      return knex.raw(`SELECT COUNT(*) FROM planets`)
        .then(res => {
          planets.pagination.total = parseInt(res.rows[0].count)

          return planets
        })
    })
}

function getLastAddedPlanet() {
  return knex.raw(`
    SELECT id, name, description, code, picture_url AS "pictureUrl",
      (SELECT COUNT(*) FROM characters WHERE planet = code) AS population,
      (SELECT array_agg(id) FROM characters WHERE planet = code LIMIT 3) as characters
      FROM planets ORDER BY id DESC LIMIT 1;
  `)
    .then(result => {
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

  description = description.replace("'", "\\'")

  return knex.raw(`
    INSERT INTO planets (name, description, code, picture_url)
    VALUES (E'${name}', E'${description}', '${code}', E'${pictureUrl}')
  `)
    .then(async result => {
      if (result.rowCount === 1)
        return getLastAddedPlanet()
      else return {}
    })
}

module.exports = {
  getAllPlanets,
  addPlanet
};