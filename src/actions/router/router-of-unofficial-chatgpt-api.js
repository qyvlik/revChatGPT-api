import {ChatGPTs} from '../../config/objects.js'
import {paramIsInvalidate, stringIsBlank} from "../../config/helper.js";

import {v4 as uuidv4} from 'uuid';
import {ChatGPTUnofficialProxyAPI} from 'chatgpt'
import express from "express";

const router = express.Router();

/**
 * @param accessToken           {string}
 * @param apiReverseProxyUrl    {string}
 * @param model                 {"text-davinci-002-render-paid"|"text-davinci-002-render-sha"}
 */
router.post('/api/chatgpt/create', (req, res) => {
    const {accessToken, apiReverseProxyUrl, model} = req.body;
    const id = uuidv4();
    const api = new ChatGPTUnofficialProxyAPI({
        accessToken,
        apiReverseProxyUrl,
        model
    });
    ChatGPTs.set(id, api);

    res.json({
        code: 200,
        message: 'success',
        data: id
    });
});

/**
 * @param id                {string}
 * @param text              {string}
 * @param conversationId    {string}
 * @param parentMessageId   {string}
 */
router.post('/api/chatgpt/send/:id', async (req, res) => {
    const {id} = req.params;
    if (stringIsBlank(id)) {
        res.status(401).json(paramIsInvalidate(`id`));
        return;
    }

    if (!ChatGPTs.has(id)) {
        res.status(404).json({code: 400, message: `${id} not found`, result: null});
        return;
    }

    const {text, conversationId, parentMessageId, messageId} = req.body;
    if (stringIsBlank(text)) {
        res.status(401).json(paramIsInvalidate(`text`));
        return;
    }

    const api = ChatGPTs.get(id);

    try {
        const ChatMessage = await api.sendMessage(text, {conversationId, parentMessageId, messageId});
        res.json({code: 200, message: 'success', data: ChatMessage});
    } catch (error) {
        res.json({code: 500, message: `${error.message} ${error.stack}`, data: null});
    }
});

export default router;
