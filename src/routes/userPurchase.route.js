const { Router } = require("express");

const isUser = require("../middlewares/isUser");
const { purchase } = require("../controllers/userPurchase.controller");


const router = Router();

router.post("/purchase/product", isUser,purchase);

module.exports = router;