const { app } = require('./app');

// Models
const { User } = require('./models/User.model');
const { Task } = require('./models/task.model');

// utils
const { db } = require('./utils/db.utils');

db.authenticate()
  .then(() => console.log('DataBase Autenticated'))
  .catch(console.log);

//* Relations
User.hasMany(Task);
Task.belongsTo(User);

db.sync()
  .then(() => console.log('DataBase Synced'))
  .catch(console.log);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server running on PORT:', PORT);
});
