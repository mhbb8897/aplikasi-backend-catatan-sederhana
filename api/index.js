import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import app routes
import appRoutes from "../src/routes/index.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(appRoutes);
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
