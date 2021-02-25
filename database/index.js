const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.connectionDb,
                  { useNewUrlParser: true },
                  { useUnifiedTopology: true }, 
                 (error) => {
                    if (!error) {console.log('Connected')}
                    else{console.log('Error '+ error)}
                 }
                    
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
