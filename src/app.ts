import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routes';
import connectDB from "./config/db";
import { envConfigs } from "./config/envconfig";


const app = express();
connectDB();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/', router);

const port = envConfigs.port || 3000;
app.listen(port,()=>{
    console.log('Server is running on port ',port);
})

