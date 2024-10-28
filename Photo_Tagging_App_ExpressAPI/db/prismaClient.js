const { PrismaClient } = require('@prisma/client');

const databaseUrl = process.env.NODE_ENV === 'test' 
    ? process.env.DATABASE_URL_TEST 
    : process.env.DATABASE_URL

const client = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

module.exports = client;