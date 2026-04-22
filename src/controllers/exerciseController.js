// src/routes/recipeRoutes.js

router.get('/', recipeController.getHomePage);

// NÝTT: GET slóð sem birtir formið

router.get('/uppskriftir/ny', recipeController.getAddRecipeForm);

// NÝTT: POST slóð sem tekur við gögnunum úr forminu router.post('/uppskriftir/ny', recipeController.createNewRecipe);

// Dýnamísk slóð fyrir staka uppskrift router.get('/uppskriftir/:id', recipeController.getRecipeDetails);
