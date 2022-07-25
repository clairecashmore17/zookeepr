//dependecy require declarations
const fs = require('fs');
const path = require('path');

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
        path.join(__dirname, '../data/animals.json'),
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

// export the functions
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};