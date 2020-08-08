module.exports = (sequelize, Sequelize) => {
    const CONFIG = sequelize.define("CONFIG", {
      appname: {
        type: Sequelize.STRING
      },
      sqlquery: {
        type: Sequelize.STRING
      }
    });
  
    return CONFIG;
  };