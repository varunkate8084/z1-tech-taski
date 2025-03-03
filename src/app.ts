import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routes';
import connectDB from "./config/db";
import { envConfigs } from "./config/envconfig";
import swagger from "swagger-ui-express";
import apiDocs from "./config/swagger";
import userRoutes from './routes/user';


const app = express();
connectDB();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/user', userRoutes);
app.use("/",swagger.serve, swagger.setup(apiDocs));
app.get("/check", (req, res) => {
    res.send("Hello World");
});

const port = envConfigs.port || 3000;
app.listen(port,()=>{
    console.log('Server is running on port ',port);
})

