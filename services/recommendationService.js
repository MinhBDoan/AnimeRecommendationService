const axios = require("axios");
const animeList = require("../data/animeData");

// Existing: Genre-based recommendations
function getRecommendationsByGenres(genres) {
  return animeList.filter(anime =>
    anime.genres.some(g => genres.includes(g))
  );
}

// Existing: Top anime
function getTopAnime() {
  return animeList
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
}

// 🔥 NEW: Recommendations based on WatchlistService
async function getRecommendationsByUser(userId) {
  try {
    const response = await axios.get(
      `http://localhost:3002/watchlist/${userId}`
    );

    const watchlistIds = response.data.data;

    if (!watchlistIds || watchlistIds.length === 0) {
      return [];
    }

    const genres = [];

    watchlistIds.forEach(id => {
      const anime = animeList.find(a => a.id === id);
      if (anime) {
        genres.push(...anime.genres);
      }
    });

    // Count frequency of genres
    const freq = {};
    genres.forEach(g => {
      freq[g] = (freq[g] || 0) + 1;
    });

    // Sort genres by frequency
    const sortedGenres = Object.keys(freq).sort(
      (a, b) => freq[b] - freq[a]
    );

    // Recommend based on top genres
    return animeList.filter(anime =>
      anime.genres.some(g => sortedGenres.includes(g))
    );

  } catch (error) {
    console.error("Error fetching watchlist:", error.message);
    return [];
  }
}

module.exports = {
  getRecommendationsByGenres,
  getTopAnime,
  getRecommendationsByUser
};