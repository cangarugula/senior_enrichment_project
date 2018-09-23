const express = require('express')
const { School, Student } = require('../db').models
const router = express.Router()

module.exports = router

// routes funnelled through '/api/schools
router.get('/', (req, res, next) => {
  School.findAll({
    include: [
      Student
    ]
  })
    .then(schools => res.send(schools))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => res.send(school))
})

router.post('/', (req, res, next) => {
  School.create(req.body)
    .then(school => res.send(school))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then( school => school.destroy())
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.update(req.body))
    .catch(next)
})
