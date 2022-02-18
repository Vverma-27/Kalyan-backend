import multer from "multer";
import path from "path";

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      console.log(ext);
      cb(new Error("File Type Not Supported"), false);
      return;
    }
    cb(null, true);
  },
});
