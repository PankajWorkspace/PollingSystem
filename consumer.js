const db = require('./config/db');
const { consumer } = require('./config/kafka'); // Reuse the imported consumer

consumer.on('message', async (message) => {
    const vote = JSON.parse(message.value);
    const { pollId, optionId } = vote;

    try {
        // Increment vote count for the selected option
        const poll = await db.query('SELECT options FROM polls WHERE id = $1', [pollId]);
        if (!poll.rows.length) throw new Error('Poll not found');

        const options = poll.rows[0].options;
        options[optionId] = (options[optionId] || 0) + 1;

        await db.query('UPDATE polls SET options = $1 WHERE id = $2', [options, pollId]);

        console.log('Vote processed successfully:', vote);
    } catch (error) {
        console.error('Error processing vote:', error);
    }
});

consumer.on('error', (err) => console.error('Kafka Consumer Error:', err));
