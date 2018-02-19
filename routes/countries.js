/* eslint-disable */

const countries = require('express').Router()
const db = require('../db')
const { Athlete, Country } = db.models
module.exports = countries

countries.get('/', (req, res, next) => {
  Country.findAll({
    include: [ Athlete ]
  })
  // .then(countries => res.send(countries))
  .then(countries => res.render('countries', {countries, title: 'Countries'}))
  .catch(next)
})

countries.get('/:id', (req, res, next) => {
  return Promise.all([
    Athlete.findAll({
      where: {countryId: req.params.id},
      include: [ Country ]
    }),
    Country.findById(req.params.id)
  ])
  // .then((athletes, country) => res.send(country))
  .then(([athletes, country]) => res.render('country', { title: country.name, athletes, country}))
  .catch(next)
})

countries.post('/', (req, res, next) => {
  Country.create(req.body)
    .then(() => res.redirect('/countries'))
    .catch(next)
})
