const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/dbconnection');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors()); 

// Routing 
app.use('/api/user', require('./routes/api/user'));
app.use('/api/post', require('./routes/api/post'));

app.listen(PORT, (err) => {
 if(err){
  console.log("There is an error while running the server");
  return;
 }
 console.log(`Welcome!! your server is running on the port ${PORT}`)
});
