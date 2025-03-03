import express from 'express';
const router = express.Router();
import userRoutes from './user';


const defaultRoutes = [
    {
        path:"/user",
        route: userRoutes
    },
]

defaultRoutes.forEach(route=>{
    router.use(route.path, route.route);
})

router.get('/', (req, res) => {
    res.send('Hello World');
});

export default router;