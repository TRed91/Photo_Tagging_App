const { Router } = require('express');
const timerController = require('../controllers/timerController')
const router = Router();

router.post('/', timerController.startTime);
router.put('/', timerController.endTimePut);

module.exports = router;