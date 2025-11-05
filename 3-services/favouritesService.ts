import { pool } from "../1-config/favourites";
import { GameModel } from "../2-models/favourites/gameModel";

export class FavouritesService {
  // POST /api/favorites/:gameId → add to favorites
  async addFavorite(user_id: number, game_id: number): Promise<void> {
    const query = `
      INSERT INTO user_favorites (user_id, game_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, game_id) DO NOTHING 
    `; // on conflict do nothing - if the user_id and game_id already exist, do not insert again
    await pool.query(query, [user_id, game_id]);
  }

  // GET /api/favorites → get user's favorites
  async getUserFavorites(user_id: number): Promise<GameModel[]> {
    const query = `
      SELECT g.game_id, g.game_name
      FROM user_favorites uf
      JOIN game g ON uf.game_id = g.game_id
      WHERE uf.user_id = $1
      ORDER BY g.game_name
    `;
    const result = await pool.query(query, [user_id]);
    return result.rows.map((row) => new GameModel(row.game_name, row.game_id));
  }

  // DELETE /api/favorites/:gameId → remove from favorites
  async removeFavorite(user_id: number, game_id: number): Promise<void> {
    const query = `
      DELETE FROM user_favorites
      WHERE user_id = $1 AND game_id = $2
    `;
    await pool.query(query, [user_id, game_id]);
  }

  // GET /api/favorites/stats → get favorite statistics for each favorite
  async getFavoriteStats(user_id: number): Promise<
    Array<{
      game_id: number;
      game_name: string;
      total_users_favorited: number;
    }>
  > {
    const query = `
      SELECT 
        g.game_id,
        g.game_name,
        COUNT(DISTINCT uf2.user_id) as total_users_favorited
      FROM user_favorites uf
      JOIN game g ON uf.game_id = g.game_id
      LEFT JOIN user_favorites uf2 ON g.game_id = uf2.game_id
      WHERE uf.user_id = $1
      GROUP BY g.game_id, g.game_name
      ORDER BY g.game_name
    `;
    const result = await pool.query(query, [user_id]);
    return result.rows.map((row) => ({
      game_id: row.game_id,
      game_name: row.game_name,
      total_users_favorited: parseInt(row.total_users_favorited),
    }));
  }
}

/*
[
  { game_id: 1, game_name: "Game A", total_users_favorited: 5 },
  { game_id: 2, game_name: "Game B", total_users_favorited: 12 },
  { game_id: 3, game_name: "Game C", total_users_favorited: 3 }
]
*/
