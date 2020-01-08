const express = require('express');
const dotenv = require('dotenv');
const AppError = require('./utils/appError');
const userRoutes = require('./routes/userRoutes');
const msgRoutes = require('./routes/msgRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/images`));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ACA_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', process.env.ACA_METHODS);
  res.setHeader('Access-Control-Allow-Headers', process.env.ACA_HEADERS);
  next();
});

app.use('/user', userRoutes);
app.use('/message', msgRoutes);
app.use('/admin', adminRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find url - ${req.originalUrl}`, 404));
});

module.exports = app;
