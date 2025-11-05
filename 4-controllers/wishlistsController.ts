import { Request, Response } from "express";
import { wishlistsService } from "../3-services/wishlistsService";

export class WishlistsController {
  private wishlistsService: wishlistsService;
  constructor() {
    this.wishlistsService = new wishlistsService();
  }

  addGameToWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id, game_id, game_notes } = req.body;
      await this.wishlistsService.addGameToWishlist(
        user_id,
        game_id,
        game_notes
      );
      res.status(200).json({ message: "Game added to wishlist" });
    } catch (error) {
      console.error("Error adding game to wishlist:", error);
      res.status(500).json({ message: "Failed to add game to wishlist" });
    }
  };

  getWishlistByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id } = req.query;
      if (!user_id) {
        res.status(400).json({ message: "user_id is required" });
        return;
      }
      const wishlist = await this.wishlistsService.getWishlistByUserId(
        user_id as string
      );
      res.status(200).json(wishlist);
    } catch (error) {
      console.error("Error getting wishlist:", error);
      res.status(500).json({ message: "Failed to get wishlist" });
    }
  };

  modifyGameNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id, game_id, game_notes } = req.body;
      await this.wishlistsService.modifyGameNotes(user_id, game_id, game_notes);
      res.status(200).json({ message: "Game notes modified" });
    } catch (error) {
      console.error("Error modifying game notes:", error);
      res.status(500).json({ message: "Failed to modify game notes" });
    }
  };

  removeGameFromWishlist = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { user_id, game_id } = req.body;
      await this.wishlistsService.removeGameFromWishlist(user_id, game_id);
      res.status(200).json({ message: "Game removed from wishlist" });
    } catch (error) {
      console.error("Error removing game from wishlist:", error);
      res.status(500).json({ message: "Failed to remove game from wishlist" });
    }
  };
}
