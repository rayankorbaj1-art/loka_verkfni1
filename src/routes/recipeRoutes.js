const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');  // THIS PATH IS IMPORTANT

router.get('/', recipeController.getHomePage);
router.get('/uppskrift/:id', recipeController.getRecipeDetails);

module.exports = router;