const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  postRegisterUser,
  postLoginUser,
  getMe,
  editUserMe,
  editUser,
  getUsers,
  showOneUser,
  deleteUser,
  Main,
  Dev,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/isAdmin");
const upload = require("../../shared/upload");
const isSuperAdmin = require("../../shared/auth/isSuperAdmin");

const router = express.Router();

router.post("/users", upload.single("image"), postRegisterUser);
router.post("/users/login", postLoginUser);
router.get("/users/me", isLoggedIn, getMe);
router.get("/users", isLoggedIn, isSuperAdmin, getUsers);
router.get("/users/:id", isLoggedIn, isSuperAdmin, showOneUser);
router.patch("/users/me", isLoggedIn, upload.single("image"), editUserMe);
router.patch(
  "/users/:id",
  isLoggedIn,
  upload.single("image"),
  isSuperAdmin,
  editUser
);

router.delete("/users/:id", isLoggedIn, isSuperAdmin, deleteUser);

router.get("/", Main);
router.get("/dev", Dev);

module.exports = router;
