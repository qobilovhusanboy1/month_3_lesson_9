const dbKnex = require("knex");
const knexFile = require("../../knexfile");

const knex = dbKnex(knexFile["development"]);

module.exports = {knex};