const express = require("express");
// const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addNews,
  patchNews,
  showNews,
  deleteNews,
  getNews,
} = require("./_controllers");
// const isAdmin = require("../../shared/auth/isAdmin");
const upload = require("../../shared/upload");
// const isSuperAdmin = require("../../shared/auth/isSuperAdmin");

const router = express.Router();

router.post("/news", upload.single("image"), addNews);
router.get("/news", getNews);
router.get("/news/:id", showNews);
router.patch(
  "/news/:id",
  // isLoggedIn,
  // isSuperAdmin,
  upload.single("image"),
  patchNews
);
router.delete(
  "/news/:id",
  // isLoggedIn, isSuperAdmin,
  deleteNews
);

module.exports = router;
