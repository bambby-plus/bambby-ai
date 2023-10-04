const { NODE_ENV: env } = require("../config");
const config = require("../config/database.config");
const { Sequelize } = require("sequelize");

let db = {};
const sequelizeInstance = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

//all models come in here

// db.free_game_whitelist = require("./models/free_game_whitelist")(sequelizeInstance, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
