/* eslint-disable */

const app = require('express').Router()
const db = require('../db')
const { Athlete, Country } = db.models
module.exports = app

app.get('/', (req, res, next) => {
  Country.findAll({
    include: [ Athlete ]
  })
  // .then(countries => res.send(countries))
  .then(countries => res.render('countries', {countries, title: 'Countries'}))
  .catch(next)
})

app.get('/:id', (req, res, next) => {
  return Promise.all([
    Athlete.findAll({
      where: {
        countryId: req.params.id
      },
      include: [ Country ]
    }),
    Country.findById(req.params.id)
  ])
  // .then((athletes, country) => res.send(country))
  .then(([athletes, country]) => res.render('country', { title: country.name, athletes, country}))
  .catch(next)
})
