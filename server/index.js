require ("dotenv").config()
const express = require("express");
const cors = require("cors");
const {PORT} = process.env
const app = express();
const {getSuggestion, checkLoginDetails} = require('./controller.js');

app.use(cors());
app.use(express.json()); 


app.get("/api/suggestion/", getSuggestion);

app.post("/login", checkLoginDetails);




app.listen(PORT, () => console.log(`up on ${PORT}`))

