require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const app = express();


app.use(cors());
app.use(express.json());
app.use(fileUpload({}));


app.use((req, res, next) => {
  if (req.path.startsWith('/static/')) {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }
  next();
});

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/api', router);

// 5. Обработчик ошибок (последний)
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    console.log('Database connection established successfully.');
  } catch (e) {
    console.log('Unable to connect to the database:', e);
  }
};

start();