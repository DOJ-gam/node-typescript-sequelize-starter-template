import express from "express";
import path from 'path';
import dotenv from "dotenv";
dotenv.config();
import db from "./config/db";
import "./models/associations";
import errorHandler from "./middlewares/errorHandller";
import appRouter from "./routes";
import cors from "cors"
import morgan from "morgan"



const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))

// routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/", appRouter);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use(errorHandler);

app.listen(port, async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Express app listening on port ${port}`);
});

export const server = app;
