const express = require('express');
const { animals } = require('./data/animals.json');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
//creating our server with express
const app = express();

//app.use() mounts a function to the server that our requests will pass trhough before going to the endpoint
// These mounted functions are known as MIDDLEWARE

/* 
-adding accessibility to our public folder in order to have access to style.css etc for the webpage without it being hidden behind an endpoint
- This also means we dont have to individually create routes, can do an entire folder
-THIS IS ADDING MIDDLEWARE
- express.static -> we made thses fiels static resources, so it can now be accessed w/o having a specific server endpoint
- this must be declared before the urlencoded and json
*/
app.use(express.static('public'));

/*
- parse our incoming strnig or array data
- express.urlencoded -> takes incoming POST data and converts it to key/value pairings that we can grab from req.body
- extended: true -> informs our server that there may be a sub-array nested in the data

*/
app.use(express.urlencoded({ extended: true}));

//parse incoming JSON data
app.use(express.json());

/*
- anytime client goes to host/api, app will use router we set up in apiRoutes
- if they go to / then they will serve back our HTML routes
*/
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });







