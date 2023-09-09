const { knex } = require("../database");

const create_product = async(req, res) => {
    try {
        const {name, price, kg} = req.body;

        const product_db = await  knex("products").select("*").where({product_name: name}).first();
        if(product_db){
            const product = await knex("products").where({product_id: product_db.product_id}).update({product_kg: product_db.product_kg+kg}).returning("*");
            
            res.status(201).json({message: "Success", product});
        } else {
            const newData = await knex("products").insert({product_name: name, product_price: price, product_kg: kg}).returning("*");

            res.status(201).json({message: "Success", data: newData});
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const get_product = async(req, res) => {
    try {
        const products = await knex("products").select("*");

        res.status(201).json({products: products});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const get_one_product = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await knex("products").select("*").where({product_id: id}).first();
        if(!product)
            return res.status(403).json({message: 'Product Not Found'});

        res.status(201).json({products: product});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const update_product = async(req, res) => {
    try {
        const {id} = req.params;
        const {name, price, kg, is_active} = req.body;
    
        const product_db = await  knex("products").select("*").where({product_id: id}).first();
        if(!product_db)
            return res.status(403).json({message: 'Product Not Found'});
    
        const product = await knex("products").where({product_id: id}).update({product_name: name, product_price: price, product_kg: kg, product_active: is_active}).returning("*");
                
        res.status(201).json({message: "Success", product});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const delete_product = async(req, res) => {
    try {
        const {id} = req.params;
        
        const product_db = await  knex("products").select("*").where({product_id: id}).first();
        if(!product_db)
            return res.status(403).json({message: 'Product Not Found'});

        const removeData = await knex("products").del().where({product_id: id}).returning("*");

        res.status(203).json({message: "Success", RemoveData: removeData});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {create_product, get_one_product, get_product, update_product, delete_product};