const fastify = require('fastify');
const app = fastify();

const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  }
];

app.get('/cit/student', (req, reply) => {
  reply.status(200).send(students);
});

app.get('/cit/student/:id', (req, reply) => {
  const studentId = parseInt(req.params.id);

  const student = students.find((st) => st.id === studentId);

  if (student) {
    reply.status(200).send(student);
  } else {
    reply.status(404).send({ error: 'Not Found' });
  }
});

app.post('/cit/student', (req, reply) => {
  const { last, first } = req.body;

  const maxId = students.reduce((max, student) => Math.max(max, student.id), 0);

  const newStudent = {
    id: maxId + 1,
    last,
    first
  };

  students.push(newStudent);

  reply.status(201).send(newStudent);
});

app.setNotFoundHandler((req, reply) => {
  reply.status(404).send({ error: 'Route Not Found' });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server is running on port 3000');
});