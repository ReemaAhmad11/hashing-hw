import express from "express";
import { connectDB } from './config/db';
import authRouter from "./routers/auth_route";
import studentRouter from './routers/student.rout'

const app = express();
connectDB();
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/studennt', studentRouter)

const PORT = process.env.port || 5005;
app.listen(PORT, () => {
  console.log("Server Run on Port : " + PORT);
});