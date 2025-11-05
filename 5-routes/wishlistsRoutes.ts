import { WishlistsController } from "../4-controllers/wishlistsController";
import express from "express";

const router = express.Router();
const wishlistsController = new WishlistsController();

/**
 * @swagger
 * /wishlists/addGameToWishlist:
 *   post:
 *     tags: [Wishlists]
 *     summary: Ajouter un jeu à la wishlist d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddGameToWishlist'
 *     responses:
 *       200:
 *         description: Jeu ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/addGameToWishlist", wishlistsController.addGameToWishlist);

/**
 * @swagger
 * /wishlists/getWishlistByUserId:
 *   get:
 *     tags: [Wishlists]
 *     summary: Obtenir la wishlist d'un utilisateur
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des jeux dans la wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameInWishlist'
 *       500:
 *         description: Erreur serveur
 */
router.get("/getWishlistByUserId", wishlistsController.getWishlistByUserId);

/**
 * @swagger
 * /wishlists/modifyGameNotes:
 *   put:
 *     tags: [Wishlists]
 *     summary: Modifier les notes d'un jeu dans la wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, game_id, game_notes]
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "1"
 *               game_id:
 *                 type: string
 *                 example: "1"
 *               game_notes:
 *                 type: string
 *                 example: "Updated notes"
 *     responses:
 *       200:
 *         description: Notes modifiées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       500:
 *         description: Erreur serveur
 */
router.put("/modifyGameNotes", wishlistsController.modifyGameNotes);

/**
 * @swagger
 * /wishlists/removeGameFromWishlist:
 *   delete:
 *     tags: [Wishlists]
 *     summary: Retirer un jeu de la wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, game_id]
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "1"
 *               game_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Jeu retiré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  "/removeGameFromWishlist",
  wishlistsController.removeGameFromWishlist
);

export default router;
