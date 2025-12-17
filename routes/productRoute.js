const express = require("express");
const { getProduct, postProduct, deleteProduct, updateProduct } = require("../controller/productController");
const productModel = require("../model/Product");

const router = express.Router();

router.get("/getproduct", getProduct);
router.get("/getproduct/:id", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});
router.post("/postProduct",postProduct)
router.delete("/deleteProduct/:id",deleteProduct)
router.put("/updateProduct/:id",updateProduct)
module.exports = router;
