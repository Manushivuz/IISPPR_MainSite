import multer from "multer";
import path from "path";
import fs from "fs";

// Define temp directory
const uploadDir = path.join("uploads", "temp");

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
//   console.log(`[Multer] Created upload directory at: ${uploadDir}`);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(`[Multer] Storing file in: ${uploadDir}`);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
//   console.log(`[Multer] File mimetype: ${file.mimetype}`);
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    console.warn(`[Multer] Rejected file: Only PDF files allowed`);
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Export the configured multer middleware
const upload = multer({ storage, fileFilter });

export default upload;
