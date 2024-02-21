// I have to create the all the functionality that required by applications to run 
import express from 'express';

const app = express()

import * as dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
dotenv.config({ path: ".env.local" });


const client = new ConvexHttpClient(process.env["CONVEX_URL"]);

app.listen(3001);


// Implement the html template that makes it look good
app.get('/', (req, res) => {
    res.send('Hello I am in the first page hit')
});


import { api } from './convex/_generated/api.js';
// for writing in the users
// client.mutation(api.user.createUser, { email: "xyz@123", name: "xyz", password: "123" }).then(console.log)

//  for reading the users
const id = "jd7ch1w7gy5r3p292dgcx3shw16kxntd";
client.query(api.user.getUserWithId, { id: id }).then(console.log)