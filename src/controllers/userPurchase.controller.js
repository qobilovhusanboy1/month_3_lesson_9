const {knex} = require("../database");

const purchase = async(req, res) =>{
    const {product_id, kg, promo} = req.body;
    
    const product_db = await  knex("products").select("*").where({product_id: product_id}).first();
    if(!product_db)
        return res.status(403).json({message: 'Product Not Found'});

    if(product_db.product_kg < kg)
        return res.status(403).json({message: "Not enough product"});

    const promo_db = await  knex("promo_codes").select("*").where({promo_code: promo}).first();
    if(!promo_db)
        return res.status(403).json({message: 'Promo code Not Found'});

    if(new Date(promo_db.promo_code_expire_date) < new Date())
        return res.status(400).json({message: "Promo code is not active"});

    let sumPrice = product_db.product_price * kg;

    if(sumPrice < 80000)
        return res.status(401).json({message: "To use the promotional code, the purchase amount must be more than 80,000 soums"});

    sumPrice = sumPrice - promo_db.promo_code_discountprice


    const [user_db] = await knex("users").select("*").where({user_id: req.idUser});
    if(user_db.balance < sumPrice)
        return res.status(401).json({message: "Insufficient funds"});


    const newBalance = user_db.balance - sumPrice;
    const newKg = product_db.product_kg - kg;

    await knex("users").where({user_id: user_db.user_id}).update({user_firstname: user_db.user_firstname, user_lastname: user_db.user_lastname, user_username: user_db.user_username, user_password: user_db.user_password, balance: newBalance});
    await knex("products").where({product_id: product_id}).update({product_name: product_db.product_name, product_price: product_db.product_price, product_kg: newKg, product_active: product_db.product_active});


    const PromoUserPrice = (sumPrice/100) * 10;
    const id = promo_db.promo_code_user_id;

    const [userPrice_db] = await knex("users").select("*").where({user_id: id});

    await  knex("users").where({user_id: promo_db.promo_code_user_id}).update({user_firstname: userPrice_db.user_firstname, user_lastname: userPrice_db.user_lastname, user_username: userPrice_db.user_username, user_password: userPrice_db.user_password, balance: userPrice_db.balance+PromoUserPrice});

    await knex("history").insert({history_user_id: user_db.user_id, history_product_id: product_id, history_promo_code_id: promo_db.promo_code_id});
    res.status(200).json({message: "Success"}); 
};

module.exports = {purchase};
