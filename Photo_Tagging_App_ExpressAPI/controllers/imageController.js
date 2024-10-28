const path = require('path');
const db = require('../db/queries');

exports.imageGet = async (req, res) => {
    try{
        const imageData = await db.getImage(parseInt(req.params.imageId));
        res.sendFile(path.resolve(imageData.imageURL))
    } catch (err) {
        console.error(err.message);
        res.json({ result: 'error', message: err.message });
    }
}

exports.imageDataGet = async (req, res) => {
    try{
        const imageData = await db.getImage(parseInt(req.params.imageId));
        res.json({ data: imageData })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ result: 'error', message: err.message });
    }
}

exports.positionGet = async(req, res) => {
    try{
        const { select, xPos, yPos } = req.query;
        const imageId = parseInt(req.params.imageId);
        const data = await db.getPosition(imageId, select);
        if (data) {
            const trueX = data.positions[0].xPosition;
            const trueY = data.positions[0].yPosition;
            if (xPos >= (trueX - 50) && xPos <= (trueX + 50)) {
                if (yPos >= (trueY - 50) && yPos <= (trueY + 50)) {
                    return res.json({ result: 'success' });
                }
            }
            return res.json({ result: 'fail' });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ result: 'error', message: err.message })
    }
}