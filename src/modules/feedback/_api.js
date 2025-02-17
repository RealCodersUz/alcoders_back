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
// const upload = require("../../shared/upload");
// const isSuperAdmin = require("../../shared/auth/isSuperAdmin");

const router = express.Router();

router.post(
  "/feeds",
  // isLoggedIn,
  // isSuperAdmin,

  addNews
);
router.get("/feeds", getNews);
router.get("/feeds/:id", showNews);
router.patch(
  "/feeds/:id",
  // isLoggedIn,
  // isSuperAdmin,

  patchNews
);
router.delete(
  "/feeds/:id",
  // isLoggedIn, isSuperAdmin,
  deleteNews
);

module.exports = router;
