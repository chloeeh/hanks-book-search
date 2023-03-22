const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // kept getting error with the following 2 options populated. error went away when 
  // they were commented out
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = mongoose.connection;

