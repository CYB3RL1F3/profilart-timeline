require("dotenv").config();

const {
  MONGODB_URI
} = process.env;

export const config = {
  db: {
    url: MONGODB_URI
  }
}