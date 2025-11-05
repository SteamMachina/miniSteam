import { Request, Response } from "express";
import { FavouritesService } from "../3-services/favouritesService";
import { UserModel } from "../2-models/favourites/userModel";

export class FavouritesController {
  private favouritesService: FavouritesService;
  constructor() {
    this.favouritesService = new FavouritesService();
  }

  addFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id, game_id } = req.body;
      await this.favouritesService.addFavorite(user_id, game_id);
      res.status(200).json({ message: "Game added to favorites" });
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Failed to add game to favorites" });
    }
  };

  getUserFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id } = req.body;
      const userFavorites = await this.favouritesService.getUserFavorites(
        user_id
      );
      res.status(200).json(userFavorites);
    } catch (error) {
      console.error("Error getting user favorites:", error);
      res.status(500).json({ message: "Failed to get user favorites" });
    }
  };

  removeFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id, game_id } = req.body;
      await this.favouritesService.removeFavorite(user_id, game_id);
      res.status(200).json({ message: "Game removed from favorites" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Failed to remove game from favorites" });
    }
  };

  getFavoriteStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id } = req.body;
      const favoriteStats = await this.favouritesService.getFavoriteStats(
        user_id
      );
      res.status(200).json(favoriteStats);
    } catch (error) {
      console.error("Error getting favorite stats:", error);
      res.status(500).json({ message: "Failed to get favorite stats" });
    }
  };
}
