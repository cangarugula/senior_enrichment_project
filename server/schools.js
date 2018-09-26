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
  School.findOne({
    where: {
      id: req.params.id
    },
    include: [
      Student
    ]
  })
    .then(school => res.send(school))
})

router.post('/', (req, res, next) => {
  School.create(req.body,
    {
      include: Student
    })
    .then(school => res.send(school))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then( school => {
      school.destroy()
      res.sendStatus(200)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {

  School.findById(req.params.id)
    .then(school => {
      school.update(req.body)
      res.send(req.body)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})
