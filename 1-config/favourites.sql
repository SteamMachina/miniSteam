-- PostgreSQL

BEGIN;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS user_favorites CASCADE;
-- Trainers table
CREATE TABLE user_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    game_id VARCHAR(100) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorite (user_id, game_id),
    INDEX idx_user (user_id)
);

COMMIT;