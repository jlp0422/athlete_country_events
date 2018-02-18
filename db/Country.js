/* eslint-disable */
const conn = require('./conn');
const { Sequelize } = conn

const Country = conn.define('country', {
  name: {
    type: Sequelize.STRING
  },
  // countryURL: {
  //   type: Sequelize.STRING
  // }
}, {
  getterMethods: {
    countryURL: function(val) {
      // console.log(val)
      if (this.name.indexOf(' ') > 0) return this.name.split(' ').join('_').toLowerCase()
      return this.name.toLowerCase()
    }
  }
})

module.exports = Country
