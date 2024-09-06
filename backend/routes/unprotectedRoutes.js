import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Welcome to the Unprotected route');
});

export default router;