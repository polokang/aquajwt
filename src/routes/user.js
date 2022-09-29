const router = require("express").Router();
const authGuard = require("../middleware/authGuard");
const { login,addUser } = require("../controllers/user");

router.get("/", (req, res) => {
  res.send("welecom to get user function!!");
});

router.post("/login", login);
router.post("/adduser", addUser);

module.exports = router;
