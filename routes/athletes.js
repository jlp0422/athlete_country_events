/* eslint-disable */

const app = require('express').Router()
const db = require('../db')
const { Athlete, Country } = db.models
module.exports = app

app.get('/', (req, res ,next) => {
  Athlete.findAll({
    include: [ Country ]
  })
  // .then(athletes => res.send(athletes))
  .then(athletes => res.render('athletes', { title: 'Athletes', athletes}))
  .catch(next)
})
