/* eslint-disable */
const conn = require('./conn')
const { Sequelize } = conn

const Athlete = conn.define('athlete', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    fullName: function() {
      return `${this.firstName} ${this.lastName}`
    }
  }
})

module.exports = Athlete
