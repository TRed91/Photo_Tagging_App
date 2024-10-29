const { Router } = require('express');
const scoreController = require('../controllers/scoreController')
const router = Router();

router.post('/', scoreController.createScore);
router.get('/', scoreController.getScores);

module.exports = router;