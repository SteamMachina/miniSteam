import { connectDB } from "./1-config/whishlistsDB";
import UserSchema from "./2-models/wishlists/userModel";
import GameSchema from "./2-models/wishlists/gameModel";

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await UserSchema.deleteMany({});
    await GameSchema.deleteMany({});

    // Insert games
    const games = await GameSchema.insertMany([
      { game_Id: 1, game_name: "The Witcher 3: Wild Hunt" },
      { game_Id: 2, game_name: "Cyberpunk 2077" },
      { game_Id: 3, game_name: "Elden Ring" },
    ]);
    console.log("✅ Games inserted:", games.length);

    // Insert users with games
    const users = await UserSchema.insertMany([
      {
        user_id: 1,
        user_name: "John Doe",
        user_games: [
          {
            game_id: 1,
            game_name: "The Witcher 3: Wild Hunt",
            game_notes: "Amazing RPG with great story and characters!",
          },
          {
            game_id: 3,
            game_name: "Elden Ring",
            game_notes: "Challenging but very rewarding gameplay",
          },
        ],
      },
      {
        user_id: 2,
        user_name: "Jane Smith",
        user_games: [
          {
            game_id: 2,
            game_name: "Cyberpunk 2077",
            game_notes: "Love the futuristic setting and graphics",
          },
          {
            game_id: 1,
            game_name: "The Witcher 3: Wild Hunt",
            game_notes: "Best open-world RPG I've played",
          },
        ],
      },
      {
        user_id: 3,
        user_name: "Bob Wilson",
        user_games: [
          {
            game_id: 3,
            game_name: "Elden Ring",
            game_notes: "Difficult but satisfying when you finally beat a boss",
          },
          {
            game_id: 2,
            game_name: "Cyberpunk 2077",
            game_notes: "Great after all the updates",
          },
          {
            game_id: 1,
            game_name: "The Witcher 3: Wild Hunt",
            game_notes: "No notes yet",
          },
        ],
      },
    ]);
    console.log("✅ Users inserted:", users.length);

    console.log("✅ Seed data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
