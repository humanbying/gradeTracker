const express = require('express');
const router = express.Router();

let Assignment = require('../models/assignment');

router.get('/', (req, res) => {
  Assignment.getAll()
    .then(assignments => {
      res.send(assignments);
    })
    .catch(err => {
      res.stuatus(400).send(err)
    })
})

router.get('/:id', (req, res) => {
  Assignment.getOne(req.params.id)
    .then(assignments => {
      res.send(assignments);
    })
    .catch(err => {
      res.stuatus(400).send(err)
    })
})

router.post('/', (req, res) => {
  Assignment.create(req.body)
    .then(assignments => {
      res.send(assignments);
    })
    .catch(err => {
      res.stuatus(400).send(err)
    })
})

router.delete('/:id', (req, res) => {
  Assignment.delete(req.params.id)
    .then(assignments => {
      res.send(assignments);
    })
    .catch(err => {
      res.stuatus(400).send(err)
    })
})

module.exports = router;
