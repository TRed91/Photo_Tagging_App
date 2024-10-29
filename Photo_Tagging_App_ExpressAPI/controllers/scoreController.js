const db = require('../db/queries');

exports.createScore = async(req, res) => {
    try{
        const { imageId, playerName, time } = req.body;
        await db.createScore(imageId, playerName, time);
        return res.json({ result: 'success', message: 'score posted successfully' });
    } catch(err) {
        console.error(err.message);
        return res.status(500).json({ result: 'error', message: err.message });
    }
}

exports.getScores = async(req, res) => {
    try {
        const { imageId } = req.query;
        const scores = await db.readTopScores(parseInt(imageId));
        return res.json({ data: scores });
    } catch(err) {
        console.error(err.message);
        return res.status(500).json({ result: 'error', message: err.message });
    }
}