import express from 'express'
import { adminHandler, getAllusersHandler, loginHandller, registerHandller, usersHandler } from '../controlers/auth_controlers';
import validate from '../middleware/validate';
import {authrize,protect} from '../middleware/auth';

import { loginSchema, registerSchema } from '../zod_schema/auth_schema';
const router =express();

router.post('/login',validate(loginSchema),loginHandller);
router.get('/users',protect,getAllusersHandler)
router.post('/register',validate(registerSchema),registerHandller);

router.get('/admin',protect,authrize('ADMIN'),adminHandler);
// router.get('/user',protect,usersHandler);
router.get('/user', protect, authrize('USER', 'ADMIN'));
router.get('/superuser', protect, authrize('ADMIN'));


export default router