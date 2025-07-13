require('dotenv').config(); 
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use('/api', userRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ alter: true }); 
    console.log("All tables have been created and synchronized.");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});