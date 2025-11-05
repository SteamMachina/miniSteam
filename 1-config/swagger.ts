import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "miniSteam API",
    version: "1.0.0",
    description: "API pour gérer les wishlists et favoris de jeux",
    contact: {
      name: "API Support",
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: "Serveur de développement",
    },
  ],
  tags: [
    {
      name: "Wishlists",
      description: "Gestion des wishlists (MongoDB)",
    },
    {
      name: "Favourites",
      description: "Gestion des favoris (PostgreSQL)",
    },
  ],
  components: {
    schemas: {
      Game: {
        type: "object",
        properties: {
          game_Id: {
            type: "number",
            example: 1,
          },
          game_name: {
            type: "string",
            example: "The Witcher 3: Wild Hunt",
          },
        },
      },
      GameInWishlist: {
        type: "object",
        properties: {
          game_id: {
            type: "number",
            example: 1,
          },
          game_name: {
            type: "string",
            example: "The Witcher 3: Wild Hunt",
          },
          game_notes: {
            type: "string",
            example: "Amazing RPG with great story!",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          user_id: {
            type: "number",
            example: 1,
          },
          user_name: {
            type: "string",
            example: "John Doe",
          },
          user_games: {
            type: "array",
            items: {
              $ref: "#/components/schemas/GameInWishlist",
            },
          },
        },
      },
      AddGameToWishlist: {
        type: "object",
        required: ["user_id", "game_id"],
        properties: {
          user_id: {
            type: "string",
            example: "1",
          },
          game_id: {
            type: "string",
            example: "1",
          },
          game_notes: {
            type: "string",
            example: "Great game!",
          },
        },
      },
      AddFavorite: {
        type: "object",
        required: ["user_id", "game_id"],
        properties: {
          user_id: {
            type: "number",
            example: 1,
          },
          game_id: {
            type: "number",
            example: 1,
          },
        },
      },
      FavoriteStats: {
        type: "object",
        properties: {
          game_id: {
            type: "number",
            example: 1,
          },
          game_name: {
            type: "string",
            example: "The Witcher 3: Wild Hunt",
          },
          total_users_favorited: {
            type: "number",
            example: 5,
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Error message",
          },
        },
      },
      Success: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Operation successful",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./5-routes/*.ts", "./app.ts"], // Paths to files containing OpenAPI definitions
};

export const swaggerSpec = swaggerJsdoc(options);
