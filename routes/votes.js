const express = require('express');
const { produceVote } = require('../producer');
const router = express.Router();

// Submit Vote
router.post('/:pollId', async (req, res) => {
    const { pollId } = req.params;
    const { optionId } = req.body;

    if (!pollId || optionId === undefined) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    try {
        await produceVote({ pollId: parseInt(pollId), optionId });
        res.status(200).json({ message: 'Vote submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
