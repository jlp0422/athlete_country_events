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

app.post('/', (req, res, next) => {
  console.log(req.body)
  return Promise.all([
    Athlete.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }),
    Country.create({
      name: req.body.name
    })
  ])
  .then(([athlete, country]) => {
    athlete.setCountry(country)
  })
  .then(() => res.redirect('/athletes'))
  .catch(next)
})
