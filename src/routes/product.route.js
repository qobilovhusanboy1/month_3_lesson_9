const { Router } = require("express");
const { create_product, get_product, get_one_product, update_product, delete_product } = require("../controllers/product.controller");

const router = Router();

router.post("/create/product", create_product);
router.get("/get/products", get_product);
router.get("/get/product/:id", get_one_product);
router.put("/update/product/:id", update_product);
router.delete("/delete/product/:id", delete_product);

module.exports = router;