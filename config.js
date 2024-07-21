import "dotenv/config";

export const PORT = process.env.PORT || 4000;
export const MONGOOSE_URI = process.env.MONGODB_URI;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
