const {Sequelize } = require('sequelize')


//conectando no banco chamado toughts2
const sequelize = new Sequelize('toughts2', 'jheanode', 'jheancarloscostarabelo123456789', {
    host: 'localhost',
    dialect: 'mysql',
  })

  try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
  } catch(err) {
    console.log(`Não foi possivel conectar: ${err}`)
  }


  module.exports = sequelize  //importando 