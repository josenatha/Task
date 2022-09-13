const express = require('express');

//* Routers
const { usersRoutes } = require('./routes/user.routes');
const { tasksRoutes } = require('./routes/task.routes');

// Init Express App
const app = express();
app.use(express.json());

//* Endpoints
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/tasks', tasksRoutes);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    messague: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
