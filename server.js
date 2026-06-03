const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const recommendationRoutes = require("./routes/recommendationRoutes");

app.use("/recommendations", recommendationRoutes);

app.listen(PORT, () => {
  console.log(`AnimeRecommendationService running on port ${PORT}`);
});