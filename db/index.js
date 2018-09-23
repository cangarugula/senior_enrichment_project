const { School, Student, db } = require('./models')

const syncAndSeed = async () => {
  await db.sync({force: true})

  const [moe,larry,curly] = await Promise.all([
    Student.create({firstName: 'moe', lastName: 'foo'}),
    Student.create({firstName: 'larry', lastName: 'bar'}),
    Student.create({firstName: 'curly', lastName: 'bazz'})
  ])

  const [hogwarts, fullstack, graceHopper] = await Promise.all([
    School.create({
      name: 'Hogwarts',
      address: 'Platform 9 & 3/4',
      description: 'A school of witchcraft and wizardry'
    }),
    School.create({
      name: 'Fullstack',
      address: '5 Hanover Sq. Floor 11',
      description: 'Co-ed coding bootcamp in New York City'
    }),
    School.create({
      name: 'Grace Hopper',
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
