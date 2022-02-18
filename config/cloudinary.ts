import cloudinary from "cloudinary";
import config from ".";
const v2 = cloudinary.v2;
v2.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export default v2;
