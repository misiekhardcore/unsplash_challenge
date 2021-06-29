import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entites/Photo";
import { User } from "./entites/User";
import photoRouter from "./routers/photoRouter";
import userRouter from "./routers/userRouter";

const main = async () => {
  // Run dotenv config
  dotenv.config();

  // Create app
  const app = express();

  // Add cors
  app.use(
    cors({
      origin: "*",
      credentials: false,
    })
  );

  // Set request parsers
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Create DB connection
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Photo, User],
  });

  await conn.runMigrations();

  app.use(express.static(path.join(__dirname, "..", "frontend/build")));
  app.use(express.static("public"));

  // Routes
  app.use("/api/photos", photoRouter);
  app.use("/api/users", userRouter);

  app.use((_, res, __) => {
    res.sendFile(path.join(__dirname, "..", "frontend/build", "index.html"));
  });

  // 404
  app.use((_, res) => {
    const error = new Error("not found");

    return res.status(404).json({ message: error.message });
  });

  // Run the server
  app.listen(process.env.PORT, () => {
    console.log("server running on ", process.env.PORT);
  });
};

main().catch((e) => {
  console.error(e);
});
