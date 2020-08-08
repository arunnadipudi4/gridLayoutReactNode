
const db = require("../models");
const Query = db.query;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.APPNAME && !req.body.SQLQUERY) {
        res.status(400).send({
          message: "APPNAME and SQLQUERY is mandatory"
        });
        return;
      }
    
      const query = {
        APPNAME: req.body.APPNAME,
        SQLQUERY: req.body.SQLQUERY,
      };
    
      // Save Query in the database
      Query.create(query)
        .then(data => {
          // db.sequelize.query('SELECT * FROM Configs').then(function(projects){
          //   res.send(projects);
          //           })
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the query."
          });
        });
};
exports.findAll = (req, res) => {
  const orderBy = req.query.orderBy;
  const APPNAME = req.query.APPNAME;
  var condition = APPNAME ? { APPNAME: { [Op.like]: `%${APPNAME}%` } } : null;
  Query.findAll({ where: condition, order: orderBy ? [[orderBy.split('-')[1], orderBy.split('-')[0]]] : [] })
    .then( data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving queries."
      });
    });
};
// Retrieve all Query from the database.
  exports.findAllByAppname = (req, res) => {
  const APPNAME = req.query.APPNAME;
  if (!APPNAME) res.send('APPNAME is needed')
  var condition = APPNAME ? { APPNAME: { [Op.like]: `%${APPNAME}%` } } : null;

  Query.findAll({ where: condition })
    .then( data => {
      const response = []
      data.forEach((record) => {
        const query = record.dataValues && record.dataValues.SQLQUERY;
        db.sequelize.query(query).then((project) => {
          response.push(project);
          if(response.length === data.length) {
            res.send(response)
          }
        })
      })
    
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
  const ID = req.params.id;

  Query.findByPk(ID)
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
    where: { ID: id }
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
    where: { ID: id }
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

