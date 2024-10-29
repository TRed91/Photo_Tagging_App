const e = require('express');
const client = require('./prismaClient');

async function main() {
    console.log("Seeding...");

    await client.image.create({
        data: {
            imageName: "waldo_01",
            imageURL: 'public/waldo_01.jpeg',
        },
    });

    await client.character.createMany({
        data: [
            { charName: 'Waldo' },
            { charName: 'Wizard' },
            { charName: 'Wenda' },
        ],
    });

    await client.position.createMany({
        data: [
            {
                imageId: 1,
                characterId: 1,
                xPosition: 1092,
                yPosition: 605,
            },
            {
                imageId: 1,
                characterId: 2,
                xPosition: 89,
                yPosition: 620,
            },
            {
                imageId: 1,
                characterId: 3,
                xPosition: 627,
                yPosition: 348,
            },
        ],
    });
}

main()
.then(() => console.log("Seeding Done!"))
.catch(err => console.error(err))
.finally(client.$disconnect());