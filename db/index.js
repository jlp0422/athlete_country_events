/* eslint-disable */
const conn = require('./conn')
const Athlete = require('./Athlete');
const Country = require('./Country');
const OlympicEvent = require('./OlympicEvent');

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Athlete.create({ firstName: 'Erin', lastName: 'Hamlin' }),
    Athlete.create({ firstName: 'Shaun', lastName: 'White'}),
    Athlete.create({ firstName: 'Mark', lastName: 'McMorris'}),
    Athlete.create({ firstName: 'Lim', lastName: 'Hyo-jun' }),
    Country.create({ name: 'USA'}),
    Country.create({ name: 'Canada'}),
    Country.create({ name: 'South Korea'}),
  ])
  .then(([erin, shaun, mark, lim, usa, canada, skorea, sbhalf, luge]) => {
    return Promise.all([
      erin.setCountry(usa),
      shaun.setCountry(usa),
      mark.setCountry(canada),
      lim.setCountry(skorea),
    ])
  })
}

Athlete.belongsTo(Country)
Country.hasMany(Athlete)

// OlympicEvent.belongsToMany(Athlete, {through: 'athlete_event'})
// Athlete.belongsToMany(OlympicEvent, { through: 'athlete_event'})


module.exports = {
  sync,
  seed,
  models: {
    Athlete,
    Country,
    // OlympicEvent
  }
}
