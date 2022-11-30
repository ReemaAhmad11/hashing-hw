import { z } from 'zod';

export const studentSchema =z.object({
    body: z.object({
        name: z.string({required_error: 'Name Student is required !'}),
        age: z.string({required_error: 'Password is required !'}),
        major: z.string({required_error: 'Email is required !'})
    }),
    params: z.object({
        id: z.string(),
      }),
})

export const teacherSchema =z.object({
    body: z.object({
      name: z.string({required_error: 'Name Teacher is required !'}),
       
    }),
    params: z.object({
        id: z.string(),
      }),
})

export const classroomSchema =z.object({
    body: z.object({
     name: z.string({required_error: 'Name Classroom is required !'}),
       
    }),
    params: z.object({
        id: z.string(),
      }),
})