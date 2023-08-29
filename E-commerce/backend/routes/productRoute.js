const express = require('express');
const { getAllProducts , createProduct, updateProduct, deleteProduct, getSingleProduct} = require('../controllers/productController');
const { isAuthenticatedUser , authorizeRoles ,abc} = require('../middleware/auth');


const router = express.Router();



router.route('/product').get(getAllProducts);

router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);

router
    .route("/product/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)
    .get(getSingleProduct);





module.exports = router;