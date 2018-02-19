/* eslint-disable */
const conn = require('./conn');
const { Sequelize } = conn

const Medal = conn.define('medal', {
  place: {
    type: Sequelize.ENUM('Gold', 'Silver', 'Bronze')
  },
  event: {
    type: Sequelize.STRING
  }
});

module.exports = Medal
