const { Router } = require('express');
const imageRouter = require('./imageRoute');
const timerRouter = require('./timerRoute');
const scoreRouter = require('./scoreRoute');

const router = Router();

router.use('/image', imageRouter);
router.use('/timer', timerRouter);
router.use('/score', scoreRouter);

module.exports = router;