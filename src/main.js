import './config/improve.js'

import express from "express";

import bodyParser from 'body-parser';

import routerOfIndex from "./actions/router/router-of-index.js";
import routerOfUnofficialChatgptApi from "./actions/router/router-of-unofficial-chatgpt-api.js";

const app = express();
app.use(bodyParser.json());

app.use(routerOfIndex);
app.use(routerOfUnofficialChatgptApi);

const port = process.env['APP_PORT'] || 7777;
const server = app.listen(port, () => {
    console.info(`app listen ${port}`);
});
