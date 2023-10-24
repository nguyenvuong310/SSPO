import ggAuthController from "../controllers/ggAuthController";
import driveController from "../controllers/driveController";
const router = require("express").Router();
const passport = require("passport");

const stream = require("stream");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // Adjust fileSize limit as needed
const type = upload.single("file");

let initWebRoutes = (app) => {
  //api for login to google
  router.get("/auth/login/success", ggAuthController.handleLoginSuccess);
  router.get("/auth/login/failed", ggAuthController.handleLoginFailed);
  router.get("/auth/logout", ggAuthController.handleLogOut);
  router.get("/auth/google", ggAuthController.handleAuthGoogle);
  router.get("/auth/google/callback", ggAuthController.handleCallBack);
  //CRUD to ggDrive
  router.get("/drive/createFolder", driveController.handleCreateFolder);
  router.post("/drive/uploadFile", type, driveController.handleUploadFile);

  return app.use("/", router);
};
module.exports = initWebRoutes;
