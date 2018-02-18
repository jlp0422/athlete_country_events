/* eslint-disable */
const conn = require('./conn')
const Athlete = require('./Athlete');
const Country = require('./Country');

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Athlete.create({ firstName: 'Erin', lastName: 'Hamlin' }),
    Athlete.create({ firstName: 'Shaun', lastName: 'White'}),
    Athlete.create({ firstName: 'Mark', lastName: 'McMorris'}),
    Athlete.create({ firstName: 'Random', lastName: 'Person' }),
    Country.create({ name: 'USA'}),
    Country.create({ name: 'Canada'}),
    Country.create({ name: 'South Korea'})
  ])
  .then(([erin, shaun, mark, random, usa, canada, skorea]) => {
    return Promise.all([
      erin.setCountry(usa),
      shaun.setCountry(usa),
      mark.setCountry(canada),
      random.setCountry(skorea)
    ])
  })
}

Athlete.belongsTo(Country)
Country.hasMany(Athlete)

module.exports = {
  sync,
  seed,
  models: {
    Athlete,
    Country
  }
}
