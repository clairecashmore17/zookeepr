//Dependencies
const {filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');

//ROUTER
/* 
    - a router allows us to move our server instance in other files without redefining
    - MUST USE PROPER MIDDLEWARE
*/
const router = require('express').Router();

//This will return a LIST of zookeepers, not a single
router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  
  // the req.aparams needs to be defined in the ROOT PATH
  //We will add :id to the end of our root path
  router.get('/zookeepers/:id', (req,res) => {
      
      // passes in the req to return a SINGLE animal
      const result = findById(req.params.id, zookeepers)
  
      // check to see if there is a result available
      if(result) {
      res.json(result);
      } else {
          res.send(404);
      }
  })
  
 
  
  
  /*************USER POPULATE DATA***********/
  // POST requests represent the action of a client requesting the server to accept data rather tahn vice versa
  router.post('/zookeepers', (req, res) => {
      //req.body is where our incoming content will be
      console.log(req.body);
      // set id based on what the nxt index of the array will be
      req.body.id = zookeepers.length.toString();
  
      //if any data in req.body is incorrect, send 400 error back
      if(!validateZookeeper(req.body)){
          res.status(400).send('The zookeeper is not properly formatted');
      } else {
          // add animal to json file and zookeepers array in this function
          const animal = createNewZookeeper(req.body,zookeepers);
  
          res.json(animal);
      }
  });
 
  //export our router
  module.exports = router;