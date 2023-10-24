const { google } = require("googleapis");
const fs = require("fs");
const handleCreateFolder = async (req, res) => {
  if (req.user && req.user.accessToken) {
    try {
      const accessToken = req.user.accessToken;

      // Initialize the Google Drive API client
      const auth = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET
      );
      auth.setCredentials({ access_token: accessToken });
      const drive = google.drive({ version: "v3", auth });

      // Create a folder in Google Drive
      const folderMetadata = {
        name: "SmartPrintingService", // Replace with the desired folder name
        mimeType: "application/vnd.google-apps.folder",
      };

      const folder = await drive.files.create({
        resource: folderMetadata,
        fields: "id",
      });

      console.log(`Folder created with ID: ${folder.data.id}`);
      res.status(200).json({
        errCode: 0,
        folderId: folder.data.id,
        message: "Folder created successfully",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Extract the specific error message from the Google Drive API response
        const googleDriveError = error.response.data.error;

        // You can access specific error fields, for example, the message field
        const errorMessage = googleDriveError.message;
        console.error("Google Drive API Error:", errorMessage);

        // You can handle the specific error message here or send it in your response
        res.status(500).json({
          error: true,
          message: "Error creating folder",
          googleDriveError: errorMessage,
        });
      }
    }
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};
let handleUploadFile = async (req, res) => {
  //   console.log(req.file);
  const accessToken = req.user.accessToken;
  //
  const folderId = req.query.folderId;
  // Initialize the Google Drive API client
  const auth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
  auth.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: "v3", auth });
  const uploadDirectory = "src/files/";

  // Write the file to the specified directory using fs.writeFile
  fs.writeFile(
    uploadDirectory + req.file.originalname,
    req.file.buffer,
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error saving file" });
      }
    }
  );

  const fileMetadata = {
    name: req.file.originalname, // Use the original filename
    parents: [folderId], // Specify the folder ID to upload to
  };
  const media = {
    mimeType: req.file.mimetype, // Use the MIME type of the uploaded file
    body: fs.createReadStream(uploadDirectory + req.file.originalname),
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    fs.unlink(uploadDirectory + req.file.originalname, () => {
      console.log("file deleted");
    });
    console.log("sucees");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  handleCreateFolder,
  handleUploadFile,
};
