/* eslint-disable */

const athletes = require('express').Router()
const db = require('../db')
const { Athlete, Country, Medal } = db.models
module.exports = athletes

athletes.get('/', (req, res ,next) => {
  Promise.all([
    Athlete.findAll({
      include: [ Country, Medal ],
      order: [
       ['lastName', 'ASC']
      ],
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
  Promise.all([
      Athlete.find({
      where: {
        id: req.params.id
      },
      include: [ Country ]
    }),
    Medal.findAll({
      where: {
        athleteId: req.params.id
      }
    })
  ])
    // .then(athlete => res.send(athlete))
    .then(([athlete, medals]) => res.render('athlete', {title: `${athlete.fullName}`, athlete, medals}))
    .catch(next)
})

athletes.post('/', (req, res, next) => {
  Promise.all([
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

athletes.post('/:id', (req, res, next) => {
  Promise.all([
    Medal.create(req.body),
    Athlete.findById(req.params.id)
  ])
    .then(([medal, athlete]) => medal.setAthlete(athlete))
    .then(() => res.redirect(`/athletes/${req.params.id}`))
    .catch(next)
})
