const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Simple route directly in server.js (no external routes)
app.get('/', (req, res) => {
    const recipes = [
        { id: 1, title: 'Pasta Carbonara', time_minutes: 30 },
        { id: 2, title: 'Pizza Margherita', time_minutes: 45 },
        { id: 3, title: 'Salat með kjúkling', time_minutes: 20 }
    ];
    
    res.render('index', { 
        title: 'Uppskriftavefinn',
        recipes: recipes 
    });
});

app.get('/uppskrift/:id', (req, res) => {
    const recipeId = req.params.id;
    res.send(`<h1>Recipe Details</h1><p>You are viewing recipe ID: ${recipeId}</p><a href="/">Back to home</a>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});