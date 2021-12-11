const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT


// create
app.post("/insert", (req, res) => {

});

// read
app.get("/getAll", (req, res) => {
  // const db = dbService.getDbServiceInstance();

  res.json({
    success: true
  })
});

// update


// delete



app.listen(process.env.PORT, () => console.log(`App is running on port ${PORT}` ));