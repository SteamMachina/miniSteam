import { FavouritesController } from "../4-controllers/favouritesController";
import express from "express";

const router = express.Router();
const favouritesController = new FavouritesController();

/**
 * @swagger
 * /favourites/addFavourite:
 *   post:
 *     tags: [Favourites]
 *     summary: Ajouter un jeu aux favoris d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddFavorite'
 *     responses:
 *       200:
 *         description: Jeu ajouté aux favoris avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       500:
 *         description: Erreur serveur
 */
router.post("/addFavourite", favouritesController.addFavorite);

/**
 * @swagger
 * /favourites/getUserFavourites:
 *   get:
 *     tags: [Favourites]
 *     summary: Obtenir les favoris d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id]
 *             properties:
 *               user_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Liste des jeux favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       500:
 *         description: Erreur serveur
 */
router.get("/getUserFavourites", favouritesController.getUserFavorites);

/**
 * @swagger
 * /favourites/removeFavourite:
 *   delete:
 *     tags: [Favourites]
 *     summary: Retirer un jeu des favoris
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddFavorite'
 *     responses:
 *       200:
 *         description: Jeu retiré des favoris avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       500:
 *         description: Erreur serveur
 */
router.delete("/removeFavourite", favouritesController.removeFavorite);

/**
 * @swagger
 * /favourites/getFavouriteStats:
 *   get:
 *     tags: [Favourites]
 *     summary: Obtenir les statistiques des favoris d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id]
 *             properties:
 *               user_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Statistiques des favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteStats'
 *       500:
 *         description: Erreur serveur
 */
router.get("/getFavouriteStats", favouritesController.getFavoriteStats);

export default router;
