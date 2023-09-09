const {knex} = require("../database");

const create_promoCode = async (req, res) => {
    try {
        const {user_id, sale_price, promo, date} = req.body;

        const promo_db = await  knex("promo_codes").select("*").where({promo_code: promo}).first();
        if(promo_db)  
            return res.status(403).json({message: "Promo code already exists"})
        
        const newPromo = await knex("promo_codes").insert({promo_code_user_id: user_id, promo_code_discountprice: sale_price, promo_code: promo, promo_code_expire_date: date}).returning("*");

        res.status(201).json({message: "Success", data: newPromo});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const get_promoCodes = async (req, res) => {
    try {
        const data = await knex("promo_codes").select("*");

        res.status(201).json({data: data});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getOne_prmoCodes = async (req, res) => {
    try {
        const {id} = req.params;
        const promo = await knex("promo_codes").select("*").where({promo_code_id: id}).first();
        if(!promo)
            return res.status(403).json({message: 'Promo code Not Found'});

        res.status(201).json({promoCode: promo});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const update_promoCodes = async (req, res) => {
    try {
        const {id} = req.params;
        const {user_id, sale_price, promo, date} = req.body;
    
        const promo_db = await  knex("promo_codes").select("*").where({promo_code_id: id}).first();
        if(!promo_db)
            return res.status(403).json({message: 'Promo code Not Found'});
    
        const UpdatePromo = await knex("promo_codes").where({promo_code_id: promo_db.promo_code_id}).update({promo_code_user_id: user_id, promo_code_discountprice: sale_price, promo_code: promo, promo_code_expire_date: date}).returning("*");
                
        res.status(201).json({message: "Success", UpdatePromo});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const delete_promoCode = async (req, res) => {
    try {
        const {id} = req.params;
        
        const promo_db = await  knex("promo_codes").select("*").where({promo_code_id: id}).first();
        if(!promo_db)
            return res.status(403).json({message: 'Promo code Not Found'});

        const removeData = await knex("promo_codes").del().where({promo_code_id: id}).returning("*");

        res.status(203).json({message: "Success", RemoveData: removeData});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {create_promoCode, get_promoCodes, getOne_prmoCodes, update_promoCodes, delete_promoCode};