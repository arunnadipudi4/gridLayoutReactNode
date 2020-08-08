module.exports = (sequelize, Sequelize) => {
    const CONFIG = sequelize.define("TEST_CONFIG", {
       
        APPNAME: {
            type: Sequelize.STRING
        },
        SQLQUERY: {
            type: Sequelize.STRING
        },
        CREATEDBY: {
            type: Sequelize.STRING
        },
        UPDATEDBY: {
            type: Sequelize.STRING
        },
        CREATEDDATE: {
            type: Sequelize.DATE
        },
        UPDATEDDATE: {
            type: Sequelize.DATE
        }
    });

    return CONFIG;
};