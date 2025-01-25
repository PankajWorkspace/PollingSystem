const kafka = require('kafka-node');
const { producer } = require('./config/kafka'); // Reuse the imported producer

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });

producer.on('ready', () => console.log('Kafka Producer Ready'));
producer.on('error', (err) => console.error('Kafka Producer Error:', err));

const produceVote = (vote) => {
    return new Promise((resolve, reject) => {
        producer.send([{ topic: 'votes', messages: JSON.stringify(vote) }], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

module.exports = { produceVote };
