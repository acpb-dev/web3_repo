let express = require('express');
let router = express.Router();

router.get('/', async function (req, res, next) {
  res.send("index.html");
  return;
});

module.exports = router;
