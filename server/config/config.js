//This file holds any configuration variables we may need 
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://prendesoDB:Melba2711DB@ds059692.mlab.com:59692/bootcamp3-google-cloud',
  },
  port: process.env.PORT||8080
};

/* Now go to the JSONtoMongo.js file and include this file as a variable named 'config' with a require() */