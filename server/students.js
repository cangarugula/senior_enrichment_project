const express = require('express')
const { School, Student } = require('../db').models
const router = express.Router()

module.exports = router


// routes funneled through /api/schools
router.get('/', (req, res, next) => {
  Student.findAll({
    include: [
      School
    ]
  })
    .then(students => res.send(students))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => res.send(student))
})

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .catch(next)
})
