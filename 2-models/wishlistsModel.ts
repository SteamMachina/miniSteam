import mongoose, { Schema, Document } from "mongoose";

// typescript interface
export interface GameInterface extends Document {
  name: string;
  notes: string;
}

export interface UserInterface extends Document {
  name: string;
  games: GameInterface[];
}

// Mongoose schema
export const GameSchema = new Schema<GameInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    required: true,
    trim: true,
  },
});

export const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  games: {
    type: [GameSchema],
    required: true,
  },
});
