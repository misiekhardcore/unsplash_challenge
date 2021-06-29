import { Request, Response } from "express";
import { getRepository } from "typeorm";
import argon2 from "argon2";
import { User } from "../entites/User";

export const login = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const user = getRepository(User).find({
      where: { username, password },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const register = async (
  req: Request<
    {},
    {},
    {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }
  >,
  res: Response
) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!(username && email && password && confirmPassword)) {
      return res
        .status(400)
        .json({ message: "fields cannot be empty" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords not match" });
    }
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await argon2.hash(password);

    await getRepository(User).save(user);

    return res.status(201).json(user);
  } catch (error) {
    if (error.code === "23505")
      return res.status(400).json({ message: "user already exists" });
    return res.status(500).json({ message: "server error" });
  }
};
