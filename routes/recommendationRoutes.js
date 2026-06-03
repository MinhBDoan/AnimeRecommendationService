const express = require("express");
const router = express.Router();
const controller = require("../controllers/recommendationController");

// Existing routes
router.get("/", controller.getRecommendations);
router.get("/top", controller.getTopAnime);

// 🔥 NEW route
router.get("/user/:userId", controller.getRecommendationsByUser);

module.exports = router;