
const MongoClient = require('mongodb').MongoClient;
    
const url = 'mongodb://localhost:27017';
const dbName = 'chat';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect(async (err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(dbName);
  const usersCollection = db.collection('users');
  const pendingRequestsCollection = db.collection('pendingRequests');
  const groupsCollection = db.collection('groups');
});