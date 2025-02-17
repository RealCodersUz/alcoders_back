const express = require("express");
// const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addCategory,
  patchCategory,
  showCategory,
  deleteCategory,
  getCategory,
} = require("./_controllers");
// const isAdmin = require("../../shared/auth/isAdmin");
const upload = require("../../shared/upload");
// const isSuperAdmin = require("../../shared/auth/isSuperAdmin");

const router = express.Router();

router.post(
  "/category",
  // isLoggedIn,
  // isSuperAdmin,
  upload.single("image"),
  addCategory
);
router.get("/category", getCategory);
router.get("/category/:id", showCategory);
router.patch(
  "/category/:id",
  // isLoggedIn,
  // isSuperAdmin,
  upload.single("image"),
  patchCategory
);
router.delete(
  "/category/:id",
  // isLoggedIn, isSuperAdmin,
  deleteCategory
);

module.exports = router;
