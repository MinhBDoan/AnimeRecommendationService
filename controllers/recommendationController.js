const service = require("../services/recommendationService");

// Existing: genre-based
function getRecommendations(req, res) {
  const genres = req.query.genres;

  if (!genres) {
    return res.status(400).json({
      success: false,
      message: "Genres query parameter is required"
    });
  }

  const genreArray = genres.split(",");
  const results = service.getRecommendationsByGenres(genreArray);

  res.json({
    success: true,
    data: results
  });
}

// Existing: top anime
function getTopAnime(req, res) {
  const results = service.getTopAnime();

  res.json({
    success: true,
    data: results
  });
}

//  NEW: user-based (WatchlistService)
async function getRecommendationsByUser(req, res) {
  const userId = req.params.userId;

  const results = await service.getRecommendationsByUser(userId);

  res.json({
    success: true,
    data: results
  });
}

module.exports = {
  getRecommendations,
  getTopAnime,
  getRecommendationsByUser
};