-- PostgreSQL

BEGIN;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS user_favorites CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS game CASCADE;

-- User table
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);

-- Game table
CREATE TABLE game (
    game_id SERIAL PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL
);

-- Junction table for many-to-many relationship
CREATE TABLE user_favorites (
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    PRIMARY KEY (user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES "user"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES game(game_id) ON DELETE CASCADE
);

-- Insert games
INSERT INTO game (game_name) VALUES 
  ('The Witcher 3: Wild Hunt'),
  ('Cyberpunk 2077'),
  ('Elden Ring');

-- Insert users
INSERT INTO "user" (user_name) VALUES 
  ('John Doe'),
  ('Jane Smith'),
  ('Bob Wilson');

-- Insert user favorites (matches MongoDB data)
-- John Doe (user_id: 1) likes The Witcher 3 (game_id: 1) and Elden Ring (game_id: 3)
INSERT INTO user_favorites (user_id, game_id) VALUES 
  (1, 1),  -- John likes The Witcher 3
  (1, 3);  -- John likes Elden Ring

-- Jane Smith (user_id: 2) likes Cyberpunk 2077 (game_id: 2) and The Witcher 3 (game_id: 1)
INSERT INTO user_favorites (user_id, game_id) VALUES 
  (2, 2),  -- Jane likes Cyberpunk 2077
  (2, 1);  -- Jane likes The Witcher 3

-- Bob Wilson (user_id: 3) likes Elden Ring (game_id: 3), Cyberpunk 2077 (game_id: 2), and The Witcher 3 (game_id: 1)
INSERT INTO user_favorites (user_id, game_id) VALUES 
  (3, 3),  -- Bob likes Elden Ring
  (3, 2),  -- Bob likes Cyberpunk 2077
  (3, 1);  -- Bob likes The Witcher 3

COMMIT;