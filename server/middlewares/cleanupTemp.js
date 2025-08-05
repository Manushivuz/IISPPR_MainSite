// middlewares/cleanupTempMiddleware.js
import fs from "fs";
import path from "path";

const cleanupTempUploads = (req, res, next) => {
  const tempDir = path.join(process.cwd(), "uploads/temp");

  if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach(file => {
      const filePath = path.join(tempDir, file);

      // Only delete files older than 10 minutes (optional)
      const stats = fs.statSync(filePath);
      const isOld = (Date.now() - stats.mtimeMs) > 10 * 60 * 1000;

      if (isOld) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error("Error deleting temp file:", err);
        }
      }
    });
  }

  next();
};

export default cleanupTempUploads;
