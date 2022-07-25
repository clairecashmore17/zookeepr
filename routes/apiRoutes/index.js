/* THIS FILE IS SERVING AS MIDDLEWARE SO THAT OUR APP KNOWS ABOUT THE ROUTES IN ANIMALROUTES.js 
- this will be a central hub for all routing function we may want to add to the application
*/

const router = require("express").Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

router.use(require('./zookeeperRoutes'));

router.use(animalRoutes);


module.exports = router;