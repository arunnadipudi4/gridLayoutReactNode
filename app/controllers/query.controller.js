const db = require("../models");
const Query = db.query;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.appname && !req.body.sqlquery) {
        res.status(400).send({
          message: "appname and sqlquery is mandatory"
        });
        return;
      }
    
      const query = {
        appname: req.body.appname,
        sqlquery: req.body.sqlquery,
      };
    
      // Save Query in the database
      Query.create(query)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the query."
          });
        });
};

// Retrieve all Query from the database.
exports.findAll = (req, res) => {
  const appname = req.query.appname;
  var condition = appname ? { appname: { [Op.like]: `%${appname}%` } } : null;

  Query.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving queries."
      });
    });
};

// Find a single Query with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Query.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Query with id=" + id
      });
    });
};

// Update a Query by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Query.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Query was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Query with id=${id}. Maybe Query was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Query with id=" + id
      });
    });
};

// Delete a Query with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Query.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Query was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Query with id=${id}. Maybe Query was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Query with id=" + id
      });
    });
};

// Delete all Query from the database.
exports.deleteAll = (req, res) => {
  Query.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Query were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all queries."
      });
    });
};

