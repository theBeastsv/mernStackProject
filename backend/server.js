import app from "./app.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_CLINET_NAME,
  api_key: process.env.CLOUD_API_KEY,
  secret_key: process.env.CLOUD_SECRET_KEY,
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
