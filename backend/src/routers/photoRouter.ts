import { Router } from "express";
import {
  createPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
} from "../controllers/photo";

const photoRouter = Router();

photoRouter.post("/", createPhoto);
photoRouter.get("/", getPhotos);
photoRouter.get("/:id", getPhoto);
photoRouter.delete("/:id", deletePhoto);

export default photoRouter;
