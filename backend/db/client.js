const {Client} = require (`pg`)

const connectionString = process.env.DATABASE_URL || `postgresql://postgres:postgres@localhost:4321/capstone`;
print(process.env.DATABASE_URL)
const client = new Client({
    connectionString,
    ssl:  process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;