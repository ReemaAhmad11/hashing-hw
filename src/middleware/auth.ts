import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface IUser{
 id: string;
 role: string;
 iat: number;
}

const protect=(req:Request, res:Response,next:NextFunction)=>{
  try{
   const header=req.headers.authorization;
   if(!header){
       return res.status(401).json({
        message:'You are not authorized to enter this route',
      })
   }
   const token=header?.split('')[1]
   const user=jwt.verify(token,process.env.JWT_SECRET as string) 
   res.locals.user= user;
   console.log(user);
   next();
  }
  catch(eroor){
    console.log(eroor);
    return res.status(401).json({
      message:'You are not authorized to enter this route'
    })
  }
}

const authrize=
(role: string)=>(req:Request, res:Response,next:NextFunction)=>{
 const user=res.locals.user as IUser;
  if(user.role != role){
    return res.status(403).json({
      message:'You are not authorized to enter this route'
  })
}
  next();
};

export {protect, authrize}