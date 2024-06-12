import express, { Request, Response, json } from 'express';
// import chatRouter from '../src/routes/testRoute/test.chat';
import helmet from "helmet";
import cors from "cors";
import { tokenMiddleware } from './middleware/token.middle';
import { testToken } from './middleware/serviceConnect.middle';
import OrgRouter from "./routes/orgRoute"
import { authMiddleware } from './middleware/auth.middle';
const app = express();

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use("/api",tokenMiddleware, authMiddleware,OrgRouter)


// const res = signToken("rohit","1")
// console.log(res);
// app.use(tokenMiddleware);

app.get('/ping',tokenMiddleware,(req: Request, res:Response) => {
   return res.status(200).json({message:'pong'});
});

export { app };