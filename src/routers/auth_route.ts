import express from 'express'
import { adminHandler, getAllusersHandler, loginHandller, registerHandller, usersHandler } from '../controlers/auth_controlers';
import validate from '../middleware/validate';
import protect from '../middleware/validate';
import authrize from '../middleware/validate';

import { loginSchema, registerSchema } from '../zod_schema/auth_schema';
const router =express();

router.post('/login',validate(loginSchema),loginHandller);
router.get('/users',protect,getAllusersHandler)
router.post('/register',validate(registerSchema),registerHandller);

router.get('/admin',protect,authrize('ADMIN'),adminHandler);
router.get('/user',protect,usersHandler);
router.get('/user', protect, authrize('USER', 'ADMIN'), usersHandler);
router.get('/superuser', protect, authrize('ADMIN'), adminHandler);


export default router