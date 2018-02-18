/* eslint-disable */
const express = require('express');
const app = express();
const db = require('./db');
const path = require('path')
const nunjucks = require('nunjucks');
const { Athlete, Country } = db.models

nunjucks.configure({ noCache: true })
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/athletes', require('./routes/athletes'))
app.use('/countries', require('./routes/countries'))

app.use((req, res, next) => {
  res.locals.path = req.url
  next()
})


app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on da port of ${port}`))

db.sync()
  .then(() => db.seed())

