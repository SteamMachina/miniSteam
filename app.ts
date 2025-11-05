import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./1-config/swagger";
import { connectDB } from "./1-config/whishlistsDB";
import { testConnection } from "./1-config/favourites";
import wishlistsRouter from "./5-routes/wishlistsRoutes";
import favouritesRouter from "./5-routes/favouritesRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/wishlists", wishlistsRouter);
app.use("/favourites", favouritesRouter);

const startServer = async () => {
  try {
    await connectDB();
    await testConnection();
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} and database is connected`
      );
    });
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB ou PostgreSQL");
    process.exit(1);
  }
};

startServer();
