const kafka = require('kafka-node');

// Kafka Client
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });

// Kafka Producer
const producer = new kafka.Producer(client);
producer.on('ready', () => console.log('Kafka Producer is ready'));
producer.on('error', (err) => console.error('Kafka Producer Error:', err));

// Kafka Consumer
const consumer = new kafka.Consumer(
    client,
    [{ topic: 'votes', partition: 0 }], // Listening to the 'votes' topic
    { autoCommit: true } // Automatically commit the offset
);
consumer.on('error', (err) => console.error('Kafka Consumer Error:', err));

// Export Kafka modules
module.exports = {
    client,
    producer,
    consumer,
};
