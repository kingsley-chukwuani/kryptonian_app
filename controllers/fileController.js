const File = require("../models/File");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Set up multer
const upload = multer({ dest: "uploads/" });

// Upload file
const uploadFile = upload.single("file");

const processUpload = async (req, res) => {
  console.log("processUpload called");
  console.log("req.file:", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file attached" });
    }

    const { filename, originalname } = req.file;
    const ext = path.extname(originalname).toLowerCase();

    // List of allowed extensions
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".tiff",
      ".webp",
    ];

    if (!allowedExtensions.includes(ext)) {
      return res.status(400).json({ message: "Only image files are allowed" });
    }

    const filePath = path.join(__dirname, "../uploads", filename);
    const content = fs.readFileSync(filePath, "base64");

    const file = new File({
      owner: req.user._id,
      filename,
      content,
    });

    const newFile = await file.save();
    fs.unlinkSync(filePath);

    res
      .status(201)
      .json({ message: "File uploaded successfully", id: newFile._id });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all images
const getImages = async (req, res) => {
  try {
    const files = await File.find().populate("owner", "email");
    res.status(200).json(files);
  } catch (error) {
    console.error("Error getting images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single image
const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id).populate("owner", "email");

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    console.error("Error getting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { uploadFile, processUpload, getImages, getImage };
