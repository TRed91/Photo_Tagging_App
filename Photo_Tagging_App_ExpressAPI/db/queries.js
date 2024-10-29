const prisma = require('./prismaClient');

exports.getImage = async(id) => {
        const data = await prisma.image.findFirst({
            where: { imageId: id },
            include: { positions: {
                include: { character: true }
            } },
        });
        return data;
    }

exports.getPosition = async(imageId, character) => {
    const data = await prisma.character.findFirst({
        where: { charName: character },
        include: { positions: {
            where: { imageId: imageId }
        } }
    })
    return data;
}

exports.createStartTime = async() => {
    const startTime = await prisma.timeTrack.create({
        data: { timeStart: Date.now() },
    });
    return startTime.timeTrackId;
}

exports.updateTimer = async(id) => {
    const endTime = await prisma.timeTrack.update({
        where: { timeTrackId: id },
        data: { timeEnd: Date.now() }, 
    });
    return endTime;
}

exports.deleteTimer = async(id) => {
    await prisma.timeTrack.delete({
        where: { timeTrackId: id },
    });
}

exports.createScore = async( imageId, playerName, time ) => {
    await prisma.score.create({
        data: {
            imageId: imageId,
            playerName: playerName,
            score: time
        }
    })
}

exports.readTopScores = async(imageId) => {
    const scores = await prisma.score.findMany({
        where: { imageId: imageId },
        orderBy: {
            score: 'asc',
        },
        take: 10,
    });
    return scores;
}