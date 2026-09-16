import db from "./client.js";

const seed = async () => {
  const SQL = `
  CREATE TABLE users (
  id UUID DEFAULT gen_random_UUID() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(300)
  );

  CREATE TABLE recipes (
  id UUID DEFAULT gen_random_UUID() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(300) NOT NULL,
  meal_time VARCHAR(1000) NOT NULL,
  cooking_level INT NOT NULL DEFAULT 0,
  pricing VARCHAR(50) NOT NULL DEFAULT 'cheap',
  filling INT NOT NULL DEFAULT 0,
  nutritious INT NOT NULL DEFAULT 0,
  cook_time VARCHAR(50) NOT NULL DEFAULT 'instant',
  product BOOLEAN DEFAULT false,
  instructions TEXT,
  notes TEXT
  );

  CREATE TABLE recipe_ingredients (
  id UUID DEFAULT gen_random_UUID() PRIMARY KEY,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  name VARCHAR(1000) NOT NULL,
  measurement VARCHAR(100)
  );

  CREATE TABLE grocery_lists (
  id UUID DEFAULT gen_random_UUID() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_ids UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE
  );
  `;

  try {
  const res = await db.query(SQL);
  console.log("Database schema successfully created");
  } catch(err) {
    console.log("Something went wrong with schema creation. ", err);
  }
  
};

export default seed;
