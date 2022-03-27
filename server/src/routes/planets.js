const Router = require('koa-router');
const queries = require('../db/queries/planets');

const router = new Router();
const BASE_URL = `/graphql/planets`;

router.get(BASE_URL, async (ctx) => {
  try {
    const planets = await queries.getAllPlanets();
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: planets
    };
  } catch (err) {
    console.log(err)
  }
})

router.post(BASE_URL, async (ctx) => {
  try {
    const planet = await queries.addPlanet(ctx.request.body);
    if (planet) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: planet
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;