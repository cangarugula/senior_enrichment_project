const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL, {logging: false})

const School = db.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
})

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gpa: {
    type: Sequelize.DECIMAL(4,2)
  }
})

Student.belongsTo(School)
School.hasMany(Student)

module.exports = {
  Student,
  School,
  db
}
