import express from 'express'
import { addNewteacher, getAllteacher, getteacherById } from '../controlers/teacher_controlers';
import validate from '../middleware/validate';
import { teacherSchema } from '../zod_schema/school_schema';

const router = express.Router();

router.get('/',getAllteacher );
router.get('/techer/:id',validate(teacherSchema),getteacherById  );
router.post('/', validate(teacherSchema), addNewteacher)

export default router;