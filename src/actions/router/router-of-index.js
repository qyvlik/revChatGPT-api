

import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        code: 200,
        message: 'success',
        data: Date.now()
    });
});

export default router;