const { Router } = require("express");
const { create_promoCode, get_promoCodes, getOne_prmoCodes, update_promoCodes, delete_promoCode } = require("../controllers/promoCode.controller");


const router = Router();

router.post("/create/promo", create_promoCode);
router.get("/get/promo", get_promoCodes);
router.get("/get/promo/:id", getOne_prmoCodes);
router.put("/update/promo/:id", update_promoCodes);
router.delete("/delete/promo/:id", delete_promoCode);

module.exports = router;