import mongoose, { Schema, Document } from "mongoose";

// typescript interface for game subdocument
export interface GameInWishlist {
  game_id: number;
  game_name: string;
  game_notes: string;
}

// typescript interface
export interface UserInterface extends Document {
  user_id: number;
  user_name: string;
  user_games: GameInWishlist[]; // array of games with user-specific notes
}

// Mongoose schema
export const UserSchema = new Schema<UserInterface>({
  user_id: {
    type: Number,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
    trim: true,
  },
  user_games: [
    {
      game_id: {
        type: Number,
        required: true,
      },
      game_name: {
        type: String,
        required: true,
        trim: true,
      },
      game_notes: {
        type: String,
        required: false,
        trim: true,
        default: "",
      },
    },
  ],
});

export default mongoose.model<UserInterface>("User", UserSchema);
