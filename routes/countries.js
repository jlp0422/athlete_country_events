/* eslint-disable */

const countries = require('express').Router()
const db = require('../db')
const { Athlete, Country, Medal } = db.models
module.exports = countries

countries.get('/', (req, res, next) => {
  Country.findAll({
    include: [ Athlete ],
    order: [
      ['name', 'ASC']
    ]
  })
  // .then(countries => res.send(countries))
  .then(countries => res.render('countries', {countries, title: 'Countries'}))
  .catch(next)
})

countries.get('/:id', (req, res, next) => {
  Promise.all([
    Athlete.findAll({
      where: {countryId: req.params.id},
      include: [ Country, Medal ],
      order: [
        ['lastName', 'ASC']
      ]
    }),
    Country.findById(req.params.id),
  ])
  // .then(([athletes, country]) => res.send(athletes))
  .then(([athletes, country]) => res.render('country', { title: country.name, athletes, country}))
  .catch(next)
})

countries.post('/', (req, res, next) => {
  Country.create(req.body)
    .then(() => res.redirect('/countries'))
    .catch(next)
})
