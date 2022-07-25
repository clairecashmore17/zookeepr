//Dependencies
const {filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

//ROUTER
/* 
    - a router allows us to move our server instance in other files without redefining
    - MUST USE PROPER MIDDLEWARE
*/
const router = require('express').Router();
/********REQUEST AND RESPONSES*********/


//This will return a LIST of animals, not a single
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  
  // the req.aparams needs to be defined in the ROOT PATH
  //We will add :id to the end of our root path
  router.get('/animals/:id', (req,res) => {
      
      // passes in the req to return a SINGLE animal
      const result = findById(req.params.id, animals)
  
      // check to see if there is a result available
      if(result) {
      res.json(result);
      } else {
          res.send(404);
      }
  })
  
 
  
  
  /*************USER POPULATE DATA***********/
  // POST requests represent the action of a client requesting the server to accept data rather tahn vice versa
  router.post('/animals', (req, res) => {
      //req.body is where our incoming content will be
      console.log(req.body);
      // set id based on what the nxt index of the array will be
      req.body.id = animals.length.toString();
  
      //if any data in req.body is incorrect, send 400 error back
      if(!validateAnimal(req.body)){
          res.status(400).send('The animal is not properly formatted');
      } else {
          // add animal to json file and animals array in this function
          const animal = createNewAnimal(req.body,animals);
  
          res.json(animal);
      }
  });
 
  //export our router
  module.exports = router;