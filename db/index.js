/* eslint-disable */
const conn = require('./conn')
const Athlete = require('./Athlete');
const Country = require('./Country');
const Medal = require('./Medal')

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
    Medal.create({ place: 'Gold', event: 'Men\'s Snowboard Halfpipe' })
  ])
  .then(([erin, shaun, mark, lim, usa, canada, skorea, sbhalf]) => {
    return Promise.all([
      erin.setCountry(usa),
      shaun.setCountry(usa),
      mark.setCountry(canada),
      lim.setCountry(skorea),
      sbhalf.setAthlete(shaun)
    ])
  })
}

Athlete.belongsTo(Country)
Country.hasMany(Athlete)

Medal.belongsTo(Athlete)
Athlete.hasMany(Medal)


module.exports = {
  sync,
  seed,
  models: {
    Athlete,
    Country,
    Medal
  }
}
