// I have to create the all the functionality that required by applications to run 
import express from 'express';
import databse from './router/db.js';
const app = express()

import * as dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
dotenv.config({ path: ".env.local" });


const client = new ConvexHttpClient(process.env["CONVEX_URL"]);



app.listen(3001);
app.use('/db', databse);

// Implement the html template that makes it look good
app.get('/', (req, res) => {
    res.send('Hello I am in the first page hit')
});


import { api } from './convex/_generated/api.js';

client.query(api.bhds.list).then(console.log);