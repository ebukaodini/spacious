const Koa = require('koa');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: `hello, world! ${process.env.DB_URL}`
  };
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;