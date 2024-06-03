const express = require("express");
const {
  uploadFile,
  processUpload,
  getImages,
  getImage,
} = require("../controllers/fileController");
const authenticateApiKey = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/uploadFile", uploadFile, authenticateApiKey, processUpload);
// router.post('/upload', authenticateApiKey, uploadFile);
router.get("/images", getImages);
router.get("/images/:id", getImage);

module.exports = router;
