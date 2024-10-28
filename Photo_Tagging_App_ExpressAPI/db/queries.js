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