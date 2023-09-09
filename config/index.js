require("dotenv/config");

const {env} = process;

const config = {
    PORT: env.PORT,
    jwtSecretKey: env.JWT_SECRETKEY,
};

module.exports = config;