import mongoose, { Schema, Document } from "mongoose";

// typescript interface
export interface GameInterface extends Document {
  game_Id: number;
  game_name: string;
}

// Mongoose schema
export const GameSchema = new Schema<GameInterface>({
  game_Id: {
    type: Number,
    required: true,
  },
  game_name: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model<GameInterface>("Game", GameSchema);
