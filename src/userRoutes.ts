// userRoutes.ts
import express, { NextFunction, Request, Response } from "express";
import db from "./database";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      next(err);
    } else {
      console.log("Data user berhasil diambil:", results);
      res.status(200).json(results);
    }
  });
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;

  db.query("SELECT * FROM user WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user by ID:", err);
      next(err);
    } else {
      console.log("Data user berhasil diambil:", results);
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).send("User tidak ditemukan");
      }
    }
  });
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const { nama, tanggal_lahir, usia, jenis_kelamin, penyakit, penyakithasil } =
    req.body;

  db.query(
    "INSERT INTO user (nama, tanggal_lahir, usia, jenis_kelamin, penyakit) VALUES (?, ?, ?, ?, ?)",
    [nama, tanggal_lahir, usia, jenis_kelamin, penyakit, penyakithasil],
    (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        next(err);
      } else {
        console.log("Data user berhasil disimpan:", results);

        // Ubah pesan success menjadi objek JSON
        const successMessage = {
          message: "Data user berhasil disimpan",
          userId: results.insertId, // Jika Anda membutuhkan ID yang baru saja disisipkan
        };

        res.status(200).json(successMessage);
      }
    }
  );
});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const { nama, tanggal_lahir, usia, jenis_kelamin, penyakit, penyakithasil } =
    req.body;

  db.query(
    "UPDATE user SET nama=?, tanggal_lahir=?, usia=?, jenis_kelamin=?, penyakit=?, penyakithasil=? WHERE id=?",
    [nama, tanggal_lahir, usia, jenis_kelamin, penyakit, penyakithasil, userId],
    (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
        next(err);
      } else {
        console.log("Data user berhasil diupdate:", results);

        // Check if any rows were affected
        if (results.affectedRows > 0) {
          const successMessage = {
            message: "Data user berhasil diupdate",
            userId: userId,
          };

          res.status(200).json(successMessage);
        } else {
          res.status(404).send("User tidak ditemukan");
        }
      }
    }
  );
});

export default router;
