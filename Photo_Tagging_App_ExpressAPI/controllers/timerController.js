const db = require('../db/queries');

exports.startTime = async(req, res) => {
    try{
        const timerId = await db.createStartTime();
        res.json({ timerId: timerId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ result: 'error', message: err.message });
    }
}

exports.endTimePut = async(req, res) => {
    try {
        const timerId = parseInt(req.body.timeId);
        const time = await db.updateTimer(timerId);
        await db.deleteTimer(timerId);
        return res.json({ result: 'success', time: parseInt(time.timeEnd - time.timeStart) });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ result: 'error', message: err.message })
    }
}