// src/config/db.js - Test data version
module.exports = {
    query: async (text, params) => {
        console.log('SQL Query:', text);
        
        // Return test data for SELECT queries
        if (text.includes('SELECT * FROM recipes')) {
            return {
                rows: [
                    { id: 1, title: 'Pasta Carbonara', time_minutes: 30, image_url: null },
                    { id: 2, title: 'Pizza Margherita', time_minutes: 45, image_url: null },
                    { id: 3, title: 'Salat með kjúkling', time_minutes: 20, image_url: null }
                ]
            };
        }
        
        // For single recipe query
        if (text.includes('SELECT * FROM recipes WHERE id = $1')) {
            const recipeId = params[0];
            return {
                rows: [
                    { id: recipeId, title: `Uppskrift ${recipeId}`, time_minutes: 30, image_url: null }
                ]
            };
        }
        
        return { rows: [] };
    }
};