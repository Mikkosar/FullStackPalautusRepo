const dotenv = require("dotenv");
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;

module.exports = {
  DATABASE_URL,
  PORT,
  SECRET,
};
