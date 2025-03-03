import express from 'express';
const router = express.Router();
import userRoutes from './user';
import swagger from "swagger-ui-express";
import apiDocs from '../config/swagger';



const defaultRoutes = [
    {
        path:"/user",
        route: userRoutes
    },
]



defaultRoutes.forEach(route=>{
    router.use(route.path, route.route);
})

router.get('/',swagger.serve, swagger.setup(apiDocs), (req:any, res:any) => {


    
});

export default router;