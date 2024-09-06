import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
      uri: process.env.USE_LOCAL_DB === 'true' || !process.env.MONGO_HOST
        ? `mongodb://${process.env.LOCAL_DB_HOST}:${process.env.LOCAL_DB_PORT}/${process.env.LOCAL_DB_NAME}`
        : process.env.MONGO_USER && process.env.MONGO_PASSWORD
        ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`
        : `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiryDays: parseInt(process.env.VALID_DAYS, 10) || 7,
    },
    frontendUrl: process.env.FRONTEND_URL,
};

export default config;