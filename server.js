const express = require('express');
const { animals } = require('./data/animals.json');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
//creating our server with express
const app = express();

//app/use() mounts a function to the server that our requests will pass trhough before going to the endpoint
// These mounted functions are known as MIDDLEWARE

//parse our incoming strnig or array data
// express.urlencoded -> takes incoming POST data and converts it to key/value pairings that we can grab from req.body
// extended: true -> informs our server that there may be a sub-array nested in the data
app.use(express.urlencoded({ extended: true}));

//parse incoming JSON data
app.use(express.json());

function filterByQuery(query, animalsArray) {
    // we will save all the results into this personalityTraitsArray and then display these results
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  //dealing with multiple personality traits
  if (query.personalityTraits) {
    // If the personailty trait is a string, save it to a different array
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // go through each personality trait and filter 
    personalityTraitsArray.forEach(trait => {
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
}

//Function to find an animal by its id (USING THE REQ.PARAM)
function findById( id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}


// function to handle the data from req.body
function createNewAnimal(body, animalsArray) {
    console.log(body);
    const animal = body;
    animalsArray.push(animal);
    // Now we have to update our animals.json file
    fs.writeFileSync(
        //want to write animals.json file in the data subdirectory, so we join its path with __dirnmae which is  the directory of the file we execute code in
        path.join(__dirname, './data/aniamls.json'),
        JSON.stringify( {animals: animalsArray }, null, 2)
        //null means we dont want to edit any of our data
        // 2 indicates we want to create white space between our values for readability
    );

    return animal;

   
}

//function to validate the POST data and ensure it has all the information necesarry to join our animals.json file
function validateAnimal(animal) {
    //if the user inputs something that isnt a string or nothing, wrong
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if(!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if(!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    //if all is okay, return true
    return true;

}

/********REQUEST AND RESPONSES*********/


//This will return a LIST of animals, not a single
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// the req.aparams needs to be defined in the ROOT PATH
//We will add :id to the end of our root path
app.get('/api/animals/:id', (req,res) => {
    
    // passes in the req to return a SINGLE animal
    const result = findById(req.params.id, animals)

    // check to see if there is a result available
    if(result) {
    res.json(result);
    } else {
        res.send(404);
    }
})


/************/

/*************USER POPULATE DATA***********/
// POST requests represent the action of a client requesting the server to accept data rather tahn vice versa
app.post('/api/animals', (req, res) => {
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


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
