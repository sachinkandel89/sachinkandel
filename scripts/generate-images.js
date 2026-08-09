const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

let auth;

if (process.env.GOOGLE_SERVICE_ACCOUNT) {
  console.log("Using GitHub Secrets...");

  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

  auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
} else {
  console.log("Using local credentials...");

  auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../credentials/service-account.json"),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
}

const drive = google.drive({
  version: "v3",
  auth,
});

const PARENT_FOLDER_ID =
  process.env.GOOGLE_PARENT_FOLDER_ID ||
  "1mzHXmMMHf6TjWTcsp4axi-2NPxoEfMmM";
  
const PUBLIC_IMAGES = path.join(__dirname, "../public/images");
const JSON_PATH = path.join(__dirname, "../public/images.json");

if (!fs.existsSync(PUBLIC_IMAGES)) {
  fs.mkdirSync(PUBLIC_IMAGES, { recursive: true });
}

async function listFolders(parentId) {
  const res = await drive.files.list({
    q: `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id,name)",
  });

  return res.data.files;
}

async function listImages(folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
    fields: "files(id,name,createdTime)",
  });

  return res.data.files;
}

async function downloadImage(fileId, destination) {
  const res = await drive.files.get(
    {
      fileId,
      alt: "media",
    },
    {
      responseType: "stream",
    }
  );

  return new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(destination);

    res.data
      .pipe(dest)
      .on("finish", resolve)
      .on("error", reject);
  });
}

async function main() {
  const folders = await listFolders(PARENT_FOLDER_ID);

  const output = {};

  for (const folder of folders) {
    console.log(`\n📁 ${folder.name}`);

    const categoryDir = path.join(PUBLIC_IMAGES, folder.name);

    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const images = await listImages(folder.id);

    output[folder.name] = [];

    for (const image of images) {
      const localPath = path.join(categoryDir, image.name);

      if (!fs.existsSync(localPath)) {
        console.log(`⬇ Downloading ${image.name}`);

        await downloadImage(image.id, localPath);
      } else {
        console.log(`✓ Already exists ${image.name}`);
      }

      output[folder.name].push({
        id: image.id,
        title: path.parse(image.name).name,
        filename: image.name,
        uploadedAt: image.createdTime,
        url: `/images/${folder.name}/${encodeURIComponent(image.name)}`,
      });
    }
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(output, null, 2));

  console.log("\n✅ images.json updated");
}

main().catch(console.error);