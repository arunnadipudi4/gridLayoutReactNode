module.exports = {
    HOST: "vamshisqlserver.database.windows.net",
    USER: "vamshi",
    PASSWORD: "ReactJS12345",
    DB: "ReactJSDB",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  // module.exports = {
  //   HOST: "vamshisqlserver.database.windows.net",
  //   USER: "vamshi",
  //   PASSWORD: "ReactJS12345",
  //   DB: "ReactJSDB",
  //   dialect: 'mssql',
  //   dialectOptions: {
  //     authentication: {
  //       type: 'ntlm',
  //       options: {
  //         domain: 'http://vamshisqlserver.database.windows.net',
  //         userName: 'vamshi',
  //         password: 'ReactJS12345'
  //       }
  //     } 
  //   },
  //     options: {
  //       instanceName: 'SQLEXPRESS'
  //     },
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  //   }
  // };