import express from 'express'
import { addNewstudent, getAllstudent, getstudentById } from '../controlers/student_controlers';
import validate from '../middleware/validate';
import { studentSchema } from '../zod_schema/school_schema';

const router = express.Router();

router.get('/', getAllstudent );
router.get('//student/:id',validate(studentSchema), getstudentById);
router.post('/', validate(studentSchema),addNewstudent )

export default router;