authRouter = require("./auth.route");
productRouter = require("./product.route");
promoCodeRouter = require("./promoCode.route");
userPurchase = require("./userPurchase.route");

module.exports = [
    authRouter,
    productRouter,
    promoCodeRouter,
    userPurchase
];