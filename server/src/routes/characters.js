const Router = require('koa-router');
const queries = require('../db/queries/characters');

const router = new Router();
const BASE_URL = `/graphql/characters`;

router.get(BASE_URL, async (ctx) => {
  try {
    const characters = await queries.getAllCharacters();
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: characters
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const character = await queries.getSingleCharacter(ctx.params.id);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: character
    };
  } catch (err) {
    console.log(err)
  }
})

router.post(BASE_URL, async (ctx) => {
  try {
    const character = await queries.addCharacter(ctx.request.body);
    if (character) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: character
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