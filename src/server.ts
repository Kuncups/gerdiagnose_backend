import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import the cors middleware
import userRoutes from "./userRoutes";
import errorMiddleware from "./errorMiddleware";

const app = express();
const port = 3001;

// Use cors middleware to enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
