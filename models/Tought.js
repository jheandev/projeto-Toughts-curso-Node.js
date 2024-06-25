const { DataTypes } = require('sequelize') //importando

const db = require ('../db/conn')//puxando a conecção

// User(usuariio)
const User = require('./User')

const Tought = db.define('Tought', {
title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought