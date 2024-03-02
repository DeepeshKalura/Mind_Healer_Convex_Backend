import express from 'express';
import * as dotenv from "dotenv";
import bodyParser from 'body-parser';

import { api } from './convex/_generated/api.js';
import { ConvexHttpClient } from "convex/browser";

const app = express()
dotenv.config({ path: ".env.local" });


const client = new ConvexHttpClient(process.env["CONVEX_URL"]);

app.listen(3001);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello I am in the first page hit')
});


app.post("/users", async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    const userId = await client.mutation(api.user.createUser, { name: name })

    if (!userId) {
        res.status(500).json({ error: 'something went wrong' });
    }

    res.status(201).json({ id: userId });

});

app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await client.query(api.user.getUserWithId, { id: id });
    if (!user) {
        return res.status(404).json({ error: 'user not found' });
    }

    res.json(user);
});

app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    await client.mutation(api.user.deleteUser, { id: id });
    res.status(200).send();
});

app.post("/sessions", async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    const sessionId = await client.mutation(api.session.createNewSession, { id: id });

    if (!sessionId) {
        res.status(500).json({ error: 'something went wrong' });
    }

    res.status(201).json({ id: sessionId });
});

app.post("/sessions/threads/", async (req, res) => {
    const { id, message, response, sentiment_compound } = req.body;
    if (!id || !message || !response || typeof sentiment_compound === 'undefined') {
        return res.status(400).json({ error: 'id, message, response, sentiment_compound are required' });
    }
    const result = await client.mutation(api.session.createdNewThread, { id: id, message: message, response: response, sentiment_compound: sentiment_compound });
    console.log(result);
    res.json(result);
});

app.patch("/sessions/threads/:id", async (req, res) => {
    const { id } = req.params;
    const value = await client.mutation(api.session.sessionEnded, { id: id });
    res.status(200).send();
});

app.patch("/sessions/:id", async (req, res) => {
    const { id } = req.params;
    await client.mutation(api.session.updateLastTime, { id: id });
    res.status(200).send();
});


app.get("/meterics/:id", async (req, res) => {
    var { id } = req.params;

});

app.get("/sessions/:id", async (req, res) => {
    const { id } = req.params;
    const result = await client.query(api.session.allSessionForUser, { id: id });
    res.json(result);
});

