// src/services/recipeService.js
const db = require('../config/db');  // FIXED PATH

const getAllRecipes = async () => {
    const result = await db.query('SELECT * FROM recipes ORDER BY id DESC');
    return result.rows;
};

const getRecipeById = async (id) => {
    const result = await db.query('SELECT * FROM recipes WHERE id = $1', [id]);
    return result.rows[0];
};

const createRecipe = async (title, timeMinutes, imageUrl) => {
    const sql = `
    INSERT INTO recipes (title, time_minutes, image_url)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const values = [title, timeMinutes, imageUrl];
    const result = await db.query(sql, values);
    return result.rows[0];
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe
};