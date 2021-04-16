const { Router } = require("express");
const { createUser } = require("../controllers/user");

const router = Router();

router.get("/users", createUser);

module.exports = router;
