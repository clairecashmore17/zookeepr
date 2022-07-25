const express = require('express');
const { animals } = require('./data/animals.json');

const PORT = process.env.PORT || 3001;
const app = express();

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
});


/************/


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
