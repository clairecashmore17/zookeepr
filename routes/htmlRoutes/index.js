const path = require('path');

//ROUTER
/* 
    - a router allows us to move our server instance in other files without redefining
    - MUST USE PROPER MIDDLEWARE
*/
const router = require("express").Router();

 /* 
      GET other html pages
  - notice the absence of /api in the /animals -> we do this to stay organized on what type of data is bring transferred at that endpoint
  - terms with api will deal with transferring JSON data, just /animals can deal with HTML pages
  */
  router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
  });

  router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
  });


/*
- creating a route to our index.html page
- the '/' route brings us to the root of the server, creates the homepage
- This get only needs to respond with an HTML page, so we can use res.sendFile instead of json
*/
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  //WILDCARD ROUTES in case a user tries to navigate somewhere that doesnt exist on the server
// WILDCARDS MUST ALWAYS BE LAST
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });




module.exports = router;