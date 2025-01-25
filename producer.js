const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

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
