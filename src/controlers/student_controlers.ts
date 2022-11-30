import { prisma } from "../config/db";
import { Response, Request, } from "express";
import  { Student } from "@prisma/client";

//Get all students
export const getAllstudent = async (req: Request, res: Response) => {
  try {
    const Allstudent = await prisma.student.findMany()
    return res.status(200).json(Allstudent);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error !",
    });
  }}

//Add new student
export const addNewstudent = async (req: Request, res: Response) => {
  try {
    const newStudent = req.body as Student;
    await prisma.student.create({ data: newStudent });
    return res.status(201).json({
      message: "Student added !",
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error !",
    });
  }
};

//Get student by the id
export const getstudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as Student;
    const teacher = await prisma.teacher.findFirst({
      where: { id },
    });
    return res.status(200).json(teacher);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};