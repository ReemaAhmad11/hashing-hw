import { prisma } from "../config/db";
import { User } from "@prisma/client";
import { Response, Request, } from "express";
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as jwt from 'jsonwebtoken';

export const loginHandller = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as User;

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({
        message: ' Wrong username or password ',
      });
    }
    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Wrong username or password ',
      });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string)
    return res.status(200).json({
      message: 'Welcome Back ',
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mrssage: 'Server Error !',
    });
  }

}

export const registerHandller = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    const hashPassword = await argon2.hash(newUser.password);
    newUser.password = hashPassword;
    await prisma.user.create({
      data: newUser
    })
    return res.status(201).json({
      message: "Welcome to the website ! ,User added !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mrssage: 'server Error !',
    });

  }
}

export const getAllusersHandler = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
  catch (error) {
    console.log(error);
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({
      message: prismaError.message,
    })
  }
}

export const adminHandler = async (req: Request, res: Response) => {
    return res.status(200).json({missage:'hey admin with id' +res.locals.user.id});
}

export const usersHandler = async (req: Request, res: Response) => {
  return res.status(200).json({missage:'hey user id'+res.locals.user.id});

}

