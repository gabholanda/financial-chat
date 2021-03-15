const router = require("express").Router();

/* GET home page */
router.get("/", (req, res) => {
  res.render("index", { title: "The Stocks" });
});

router.post("/chat", (req, res) => {
  const nickname = req.body;
  res.render("chat", nickname);
});

module.exports = router;
