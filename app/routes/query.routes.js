module.exports = app => {
    const query = require("../controllers/query.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Query
    router.post("/", query.create);
  
    // Retrieve all query
    router.get("/", query.findAll);

    // Retrieve a single Query with id
    router.get("/:id", query.findOne);
  
    // Update a Query with id
    router.put("/:id", query.update);
  
    // Delete a Query with id
    router.delete("/:id", query.delete);
  
    // Delete all query
    router.delete("/", query.deleteAll);
  
    app.use('/api/query', router);
  };