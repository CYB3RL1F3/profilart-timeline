require('dotenv').config();

const { MONGODB_URI, REDIS_URL, REDIS_COLLECTION, JWT } = process.env;

export const config = {
  db: {
    url: MONGODB_URI,
  },
  redis: {
    name: 'profils',
    url: REDIS_URL,
    collection: REDIS_COLLECTION,
  },
  jwt: {
    secret: JWT
  },
};
