const express = require('express');
const path = require('path');
const workoutRoutes = require('./src/routes/workoutRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Routes
app.use('/', workoutRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🏋️‍♂️ FitFlow AI running on http://localhost:${PORT}`);
});