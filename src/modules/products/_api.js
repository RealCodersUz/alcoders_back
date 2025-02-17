const express = require("express");
// const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addProducts,
  showProducts,
  deleteProducts,
  getProducts,
  patchProducts,
} = require("./_controllers");
// const isAdmin = require("../../shared/auth/isAdmin");
const upload = require("../../shared/upload");
// const isSuperAdmin = require("../../shared/auth/isSuperAdmin");

const router = express.Router();

router.post(
  "/products",
  // isLoggedIn,
  // isSuperAdmin,
  upload.single("image"),
  addProducts
);
router.get("/products", getProducts);
router.get("/products/:id", showProducts);
router.patch(
  "/products/:id",
  // isLoggedIn,
  // isSuperAdmin,
  upload.single("image"),
  patchProducts
);
router.get("/products/:categoryId", getProducts);
router.delete(
  "/products/:id",
  // isLoggedIn, isSuperAdmin,
  deleteProducts
);

module.exports = router;
