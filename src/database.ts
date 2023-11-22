// database.ts
import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gerdiagnose",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke MySQL gagal:", err);
  } else {
    // console.log("Koneksi ke MySQL berhasil!");
  }
});

export default db;
