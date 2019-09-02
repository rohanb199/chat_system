import {Router} from 'express';
import {createAuth, destroyAuth, getAuth, setAuth} from "../controls/auth.control";

const router = Router();

router.route('/status').get(getAuth);
router.route('/signIn').post(setAuth);
router.route('/logOut').delete(destroyAuth);
router.route('/signUp').post(createAuth);

export default router;
