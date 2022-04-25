const LOCAL_URL = `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api`;
const PROD_URL = "https://production.werapun.com/api";

console.log("node env", process.env.NODE_ENV);

const common = {
  PORT: +process.env.NEXT_PUBLIC_API_PORT,
};

const development = {
  ...common,
  URL: LOCAL_URL,
};

const production = {
  ...common,
  URL: PROD_URL,
};

const config = process.env.NODE_ENV === "production" ? production : development;

module.exports = config;
