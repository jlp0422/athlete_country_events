/* eslint-disable */

const athletes = require('express').Router()
const db = require('../db')
const { Athlete, Country } = db.models
module.exports = athletes

athletes.get('/', (req, res ,next) => {
  return Promise.all([
    Athlete.findAll({
      include: [ Country ]
    }),
    Country.findAll({
      include: [ Athlete ]
    })
  ])
  // .then(athletes => res.send(athletes))
  .then(([athletes, countries]) => res.render('athletes', { title: 'Athletes', athletes, countries }))
  .catch(next)
})

athletes.get('/:id', (req, res, next) => {
  Athlete.find({
    where: {
      id: req.params.id
    },
    include: [ Country ]
  })
    // .then(athlete => res.send(athlete))
    .then(athlete => res.render('athlete', {title: `${athlete.fullName}`, athlete}))
    .catch(next)
})

athletes.post('/', (req, res, next) => {
  return Promise.all([
    Athlete.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }),
    Country.findOrCreate({
      where: {name: req.body.name}
    })
  ])
  .then(([athlete, country]) => {
    athlete.setCountry(country[0])
  })
  .then(() => res.redirect('/athletes'))
  .catch(next)
})
