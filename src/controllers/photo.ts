import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { Photo } from "../entites/Photo";

export const getPhotos = async (
  req: Request<{}, {}, {}, { page: number; search: string }>,
  res: Response<
    { photos: Photo[]; isNext: boolean } | { message: string }
  >
) => {
  try {
    const perPage = 10;
    const photos = await getRepository(Photo).find({
      // relations: ["user"],
      order: { createdAt: "DESC" },
      where: { label: Like(`%${req.query.search}%`) },
      take: perPage + 1,
      skip: req.query.page * perPage,
    });

    let isNext = false;
    if (photos.length === perPage + 1) {
      isNext = true;
    }
    return res
      .status(200)
      .json({ photos: photos.slice(0, perPage), isNext });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const getPhoto = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  try {
    const photos = await getRepository(Photo).findOne({
      id: req.params.id,
    });
    return res.status(200).json(photos);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const createPhoto = async (req: Request, res: Response) => {
  try {
    const { label, url, user } = req.body;

    if (!(label.trim() && url.trim() && user)) return;
    const newPhoto = new Photo();
    newPhoto.label = label;
    newPhoto.url = url;
    newPhoto.user = user;

    await getRepository(Photo).save(newPhoto);

    return res.status(201).json(newPhoto);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const deletePhoto = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  try {
    await getRepository(Photo).delete({ id: req.params.id });

    return res.status(201).json(true);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
