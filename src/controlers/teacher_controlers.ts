import { prisma } from "../config/db";
import { Request, Response } from "express";
import {Teacher} from '@prisma/client'


//Get all teachers
export const getAllteacher = async (req: Request, res: Response) => {
    try {
      const Allteacher = await prisma.teacher.findMany();
       return res.status(200).json(Allteacher);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error !",
      });
    }
  };

//Get teacher by id
export const addNewteacher = async (req: Request, res: Response) => {
  try {
    const newTeacher = req.body as Teacher;
    await prisma.teacher.create({ data: newTeacher });
    return res.status(201).json({
      message: "Teacher added",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error !",
    });
  }
};

//Add new teacher
export const getteacherById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as Teacher;
      const teacher = await prisma.teacher.findFirst({
        where: { id },
      });
      return res.status(200).json(teacher);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error !" });
    }
  };