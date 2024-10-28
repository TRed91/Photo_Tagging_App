const { Router } = require('express');
const imageController = require('../controllers/imageController')
const router = Router();

router.get('/:imageId', imageController.imageGet);
router.get('/:imageId/data', imageController.imageDataGet);
router.get('/:imageId/position', imageController.positionGet);

module.exports = router;