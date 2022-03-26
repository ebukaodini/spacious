const Koa = require('koa');
const indexRoutes = require('./routes/index');
const planetsRoutes = require('./routes/planets');

const app = new Koa();
const PORT =
  process.env.NODE_ENV === 'test' ?
    process.env.PORT_TEST :
    (process.env.PORT || 3000);

app.use(indexRoutes.routes());
app.use(planetsRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;