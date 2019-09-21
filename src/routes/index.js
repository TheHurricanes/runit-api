import {Router as expressRouter} from 'express';
import {identify} from '../controllers/identify';
import {compile} from '../controllers/compile';
import {failureResponse} from '../utils/http-responses';

const router = expressRouter();

router.get('/', (req, res) => failureResponse({res}));
router.post('/identify', identify);
router.post('/compile', compile);

router.use((req, res) => {
	failureResponse({res});
});

export default router;
