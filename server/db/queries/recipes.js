import db from "../client.js";

export async function createRecipe(body) {
    const { userId,
        name,
        mealtime,
        cookingLevel,
        pricing,
        filling,
        nutritious,
        cookTime,
        product,
        instructions,
        notes,
        ingredients } = body;

    const SQL = `
    WITH inserted_recipe AS (
        INSERT INTO recipes
        (user_id, name, meal_time, cooking_level, pricing, filling,
        nutritious, cook_time, product, instructions, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
        )
    INSERT INTO recipe_ingredients
    (recipe_id, name, ingredients, measurement)
    VALUES(inserted_recipe.id, $11,
        (SELECT * FROM json_to_recordset($12) AS
        x(name VARCHAR(1000), measurement VARCHAR(100)))
    RETURNING *, inserted_recipe.*;
    `;

    const res = db.query(SQL, [id, name, mealtime, cookingLevel, pricing, filling, nutritious, cookTime, product, instructions, notes, ingredients]);
    return res.rows[0];
}

export async function updateRecipe(body) {
    const { id,
        name,
        mealtime,
        cookingLevel,
        pricing,
        filling,
        nutritious,
        cookTime,
        product,
        instructions,
        notes,
        ingredients,
        recipeId } = body;
    
    const SQL = `
    WITH updated_recipe AS (
        UPDATE recipes SET
        (user_id, name, meal_time, cooking_level, pricing, filling,
        nutritious, cook_time, product, instructions, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        WHERE id = $13
        RETURNING *
        )
    UPDATE recipe_ingredients
    (recipe_id, name, ingredients, measurement)
    VALUES(updated_recipe.id, $11,
        (SELECT * FROM json_to_recordset($12) AS
        x(name VARCHAR(1000), measurement VARCHAR(100)))
    RETURNING *, inserted_recipe.*;
    `;
}