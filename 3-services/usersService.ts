import { pool } from "../1-config/favourites";
import UserSchema, { UserInterface } from "../2-models/wishlists/userModel";

export class usersService {
  //create user in both PostgreSQL and MongoDB
  async createUser(userData: Partial<UserInterface>): Promise<UserInterface> {
    // First, create in PostgreSQL (favourites system)
    const query = `
            INSERT INTO "user" (user_name)
            VALUES ($1)
            RETURNING user_id, user_name
        `;
    const result = await pool.query(query, [userData.user_name]);
    const pgUser = result.rows[0];

    // Then, create in MongoDB (wishlists system) with the same user_id
    const mongoUserData = {
      user_id: pgUser.user_id, // Use the PostgreSQL generated user_id
      user_name: pgUser.user_name,
      user_games: userData.user_games || [], // Default to empty array if not provided
    };

    const user = new UserSchema(mongoUserData);
    const savedUser = await user.save();

    return savedUser;
  }
}
