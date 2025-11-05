import UserSchema, { UserInterface } from "../2-models/wishlists/userModel";
import GameSchema, { GameInterface } from "../2-models/wishlists/gameModel";

export class wishlistsService {
  //create user
  async createUser(userData: Partial<UserInterface>): Promise<UserInterface> {
    const user = new UserSchema(userData);
    return user.save();
  }

  //create game
  async createGame(gameData: Partial<GameInterface>): Promise<GameInterface> {
    const game = new GameSchema(gameData);
    return game.save();
  }

  //get all users
  async getAllUsers(): Promise<UserInterface[]> {
    return UserSchema.find();
  }

  //get all games
  async getAllGames(): Promise<GameInterface[]> {
    return GameSchema.find();
  }

  //find user by id
  async getUserById(id: string): Promise<UserInterface | null> {
    return UserSchema.findOne({ user_id: Number(id) });
  }

  //find game by id
  async getGameById(id: string): Promise<GameInterface | null> {
    return GameSchema.findOne({ game_Id: Number(id) });
  }

  //add game to wishlist
  async addGameToWishlist(
    user_id: string,
    game_id: string,
    game_notes: string = ""
  ): Promise<UserInterface | null> {
    return UserSchema.findOneAndUpdate(
      { user_id: Number(user_id) },
      {
        $push: {
          user_games: { game_id: Number(game_id), game_notes: game_notes },
        },
      },
      { new: true }
    );
  }

  //remove game from wishlist
  async removeGameFromWishlist(
    user_id: string,
    game_id: string
  ): Promise<UserInterface | null> {
    return UserSchema.findOneAndUpdate(
      { user_id: Number(user_id) },
      { $pull: { user_games: { game_id: Number(game_id) } } },
      { new: true }
    );
  }

  //get wishlist by user id - returns only games array
  async getWishlistByUserId(user_id: string): Promise<any[] | null> {
    const user = await UserSchema.findOne({ user_id: Number(user_id) }).select(
      "user_games"
    );
    return user?.user_games || null;
  }

  // modify game notes
  async modifyGameNotes(
    user_id: string,
    game_id: string,
    notes: string
  ): Promise<UserInterface | null> {
    return UserSchema.findOneAndUpdate(
      { user_id: Number(user_id), "user_games.game_id": Number(game_id) },
      { $set: { "user_games.$.game_notes": notes } },
      { new: true }
    );
  }
}
