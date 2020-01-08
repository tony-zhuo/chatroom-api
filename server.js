const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    const port = process.env.NODE_ENV === 'development' ? 3001 : 8080;
    const server = app.listen(port, () => {
      console.log(`listening on ${port}`);
    });

    // eslint-disable-next-line global-require
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      // console.log('123');
      // io.getIO().emit('system', {
      //   newUser: 'new user is comme in'
      // });
    });
    module.exports = server;
  });
