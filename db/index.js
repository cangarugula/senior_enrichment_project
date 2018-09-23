const { School, Student, db } = require('./models')

const syncAndSeed = async () => {
  await db.sync({force: true})

  const [moe,larry,curly] = await Promise.all([
    Student.create({firstName: 'Moe', lastName: 'Foo', gpa: 3.0}),
    Student.create({firstName: 'Larry', lastName: 'Bar', gpa: 3.14}),
    Student.create({firstName: 'Curly', lastName: 'Bazz', gpa: 3.27}),
    Student.create({firstName: 'Shep', lastName: 'Qug', gpa: 2.9}),
  ])

  const [hogwarts, fullstack, graceHopper] = await Promise.all([
    School.create({
      name: 'Hogwarts',
      address: 'Platform 9 & 3/4',
      description: 'A school of witchcraft and wizardry'
    }),
    School.create({
      name: 'Fullstack Academy',
      address: '5 Hanover Sq. Floor 11',
      description: 'Co-ed coding bootcamp in New York City'
    }),
    School.create({
      name: 'Grace Hopper Program',
      address: '5 Hanover Sq. Floor 25',
      description: 'All women coding bootcamp in New York City'
    })
  ])

  moe.setSchool(hogwarts)
  larry.setSchool(fullstack)
  curly.setSchool(fullstack)

  await Promise.all(
    [moe,larry,curly].map(student => student.save())
  )
  console.log('synced and seeded')
}

module.exports = {
  models: {
    School,
    Student
  },
  syncAndSeed
}
