import express from 'express';
import controllers from '../controllers';
import Auth, { validateRequest } from '../middlewares/auth';
import validators from '../validators';
const router = express.Router();

// router.post('/register',validateRequest(validators.userValidators.register),controllers.User.create);
// router.post('/login',validateRequest(validators.userValidators.Login),controllers.User.login);
// router.get('/',validateRequest(validators.userValidators.getUserDetails),Auth.authenticate, controllers.User.UserDetails);


router.get('/getbyTitle/:title',validateRequest(validators.userValidators.getUserByTitle),controllers.User.getUserByTitle);
router.get("/serchTerm/:search",validateRequest(validators.userValidators.getSearchTerm),controllers.User.getSearchTerm);
export default router;
