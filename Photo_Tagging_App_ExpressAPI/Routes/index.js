const { Router } = require('express');
const imageRouter = require('./imageRoute');

const router = Router();

router.get('/', (req, res) => res.send("Hello Word!"));

router.use('/image', imageRouter);

module.exports = router;