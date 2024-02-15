import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import topicFilter from './controllers/topicFilter.js'
import intensityRelevance from "./controllers/intensityRelevance.js";
import sectorTitle from "./controllers/sectorTitle.js";
import likelihoodYear from "./controllers/likelihoodYear.js";
import likelihoodMonth from "./controllers/likelihoodMonth.js";
import likelihoodMonthPublished from "./controllers/likelihoodMonthPublished.js";

dotenv.config();  // env variables from .env file
const app = express();


// vd_database, is the name of database in mongoDB
// dbName, name of the database, should be same as in MongoDB 
mongoose.connect(process.env.MONGODB_URL, {
    dbName: 'vd_database'
}).then(() => console.log("MongoDB is connected"));


// to use json in express 
// solving permission for cors origin 
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


// routing or path
app.get('/topic', topicFilter);
app.get('/ir', intensityRelevance);
app.get('/st', sectorTitle);
app.get('/ly', likelihoodYear)
app.get('/lm', likelihoodMonth)
app.get('/lmp', likelihoodMonthPublished)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})