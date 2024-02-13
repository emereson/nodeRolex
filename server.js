import 'dotenv/config';
import { app } from './app.js';
import { db } from './database/config.js';
import { initModel } from './models/initModels.js';

const PORT = process.env.PORT || 3031;

db.authenticate()
  .then(() => {
    console.log(`Database Authenticated! 👍`);
    return initModel();
  })
  .then(() => {
    return db.sync();
  })
  .then(() => {
    console.log(`Database Synced 💪`);
    app.listen(PORT, () => {
      console.log(`App Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
