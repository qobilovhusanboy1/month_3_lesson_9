const bcrypt = require("bcrypt");
const {knex} = require("../database")

const jwt = require("../utils/jwt")

const register = async(req, res) => {
    try {
        const {firstName, lastName, userName, password} = req.body;

        const findUser = await knex('users').select('*').where({user_username: userName}).first();
        if(findUser)
            return res.status(403).json({message: "Username already exists"});

        const hashedPass = await bcrypt.hash(password, 12);

        const [user] = await knex("users").insert({user_firstname: firstName, user_lastname: lastName, user_username: userName, user_password: hashedPass}).returning("user_id");

        const token = jwt.sign({id: user.user_id});

        res.status(201).json({message: 'Success', token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
};

const login = async(req, res) => {
    const {username, password} = req.body;

    const findUser = await knex("users").select("*").where({user_username: username}).first();
    if(!findUser)
        return res.status(403).json({message: 'Invalid username or password'});

    const pswd = await bcrypt.compare(password, findUser.user_password);

    if(!pswd)
        return res.status(403).json({message: 'Invalid username or password'});

    const token = jwt.sign({id: findUser.user_id});

    res.status(201).json({message: 'Success', token});
};

module.exports = {register, login}; 