import express from "express";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoute from "./src/routes/authRoute.js";
import homeRoute from "./src/routes/homeRoute.js";
import { isAuthenticated } from "./src/middleware/auth.js";

app.use("/auth", authRoute);
app.use("/home",  homeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})