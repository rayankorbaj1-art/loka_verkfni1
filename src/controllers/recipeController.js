// src/controllers/recipeController.js
const recipeService = require('../services/recipeService');

const getHomePage = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        console.log('Recipes fetched:', recipes); // Debug: See what's being fetched
        
        // Make sure recipes is always an array
        const recipesArray = recipes || [];
        
        res.render('index', { 
            title: 'Uppskriftavefinn',
            recipes: recipesArray  // Always pass an array
        });
    } catch (error) {
        console.error('Error:', error);
        // Even on error, pass an empty array
        res.render('index', { 
            title: 'Uppskriftavefinn',
            recipes: []  // Empty array on error
        });
    }
};

const getRecipeDetails = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeService.getRecipeById(recipeId);
        
        if (!recipe) {
            return res.status(404).send('Uppskrift fannst ekki');
        }
        
        res.render('recipe', { 
            title: recipe.title,
            recipe: recipe 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Villa kom upp');
    }
};

module.exports = {
    getHomePage,
    getRecipeDetails
};