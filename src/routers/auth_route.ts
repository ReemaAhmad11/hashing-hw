import express from 'express'
import { loginHandller, registerHandller } from '../controlers/auth_controlers';
import validate from '../middleware/validate';
import { loginSchema, registerSchema } from '../zod_schema/auth_schema';
const router =express();

router.post('/login',validate(loginSchema),loginHandller);
router.post('/register',validate(registerSchema),registerHandller);
export default router