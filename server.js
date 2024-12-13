const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(fileUpload());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

app.post('/upload', (req, res) => {
    console.log("req",req)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;

  const filePath = path.join(uploadDir, uploadedFile.name);
  uploadedFile.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to upload file.');
    }

    res.send({ message: 'File uploaded successfully!', filePath });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
