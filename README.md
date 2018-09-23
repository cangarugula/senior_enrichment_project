The Premise
Acme has gone into the education business!! They need to manage schools and students. A student belongs to a school and a school has many students.

Models and Views

School

  name
  address
  description

Student

  firstName
  lastName
  gpa


/schools a listing of all schools and the number of students in each school. Clicking on a school will navigate to /schools/:id

/students - a listing of all students and the name of their school (if they have one). Clicking on a student will navigate to /students/:id

/schools/create - a school can be created in this view.

/student/create - a student can be created in this view.

/schools/:id shows the details for the school along with all the students in that school. A school can be edited in this view. A student can be removed from the school in this view and a student can be added to a school in this view. A school can also be deleted in this view. There should also be a link to add a new student to this school which will navigate to /students/create/:schoolId where the schoolId can be used to pre-populate the school.

/students/:id - shows the details for the student and gives the ability to modify the student and set/remove their school. A student can be deleted in this view.
