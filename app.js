const express = require("express");
const { google } = require("googleapis");

const app = express();

// Konfigurasi OAuth 2.0
const clientID =
  "429383155290-2f806ol4qg58om08gj273jfv4n0ktuo1.apps.googleusercontent.com";
const clientSecret = "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";
const redirectURI = "http://localhost:3000/auth/google";
const oauth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  redirectURI
);

// Membuat URL autentikasi
const scopes = ["https://www.googleapis.com/auth/plus.me"];
const authURL = oauth2Client.generateAuthUrl({ scope: scopes });

// Mengarahkan pengguna ke halaman autentikasi Google
app.get("/auth/google", (req, res) => {
  res.redirect(authURL);
});

// Mengatur URL pengalihan (redirect URL) yang ditentukan di konfigurasi OAuth
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // Mendapatkan token akses setelah pengguna berhasil melakukan autentikasi
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Menggunakan klien OAuth yang disetel untuk memanggil API Google
    const plus = google.plus({ version: "v1", auth: oauth2Client });
    const userInfo = await plus.people.get({ userId: "me" });

    // Melakukan sesuatu dengan data pengguna yang diambil
    console.log(userInfo.data);

    // Mengirimkan respons kepada pengguna
    res.send("Login berhasil!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Terjadi kesalahan saat login.");
  }
});

// Menjalankan server di port 3000
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
