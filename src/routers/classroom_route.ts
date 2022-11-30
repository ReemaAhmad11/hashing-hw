import express from 'express'
import { getAllclassroom, getclassroomById ,addNewteacher } from '../controlers/classroom_controlers';
import validate from '../middleware/validate';
import { teacherSchema } from '../zod_schema/school_schema';

const router = express.Router();

router.get('/',getAllclassroom );
router.get('/class/:id',validate(teacherSchema),getclassroomById  );
router.post('/', validate(teacherSchema), addNewteacher)

export default router