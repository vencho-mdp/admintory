const { Router } = require("express");
const { createUser, loginUser } = require("../controllers/auth");

const router = Router();

router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);

module.exports = router;
