const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Create Poll
router.post('/', async (req, res) => {
    const { title, options } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO polls (title, options) VALUES ($1, $2) RETURNING *',
            [title, JSON.stringify(options)]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Poll Results
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM polls WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
