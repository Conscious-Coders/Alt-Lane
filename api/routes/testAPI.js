var express = require("express");
var router = express.Router();

// router.get("/", function(req, res, next) {
//     res.send("API is working properly");
// });

router.get("/", function(req, res, next) {
    res.send("checking mentor route");
});

router.get("/mentor", function(req, res, next) {
    res.send("checking TEST PLEASE route");
});

module.exports = router;