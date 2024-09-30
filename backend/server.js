const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Elasticsearch client with basic authentication
const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',    // Replace with your username
    password: 'MIjtskp0hbfppDYRexDA'  // Replace with your password
  }
});

// Add a note to Elasticsearch
app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await client.index({
      index: 'notes',
      body: { title, content },
    });
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding note');
  }
});

// Search for notes
app.get('/notes/search', async (req, res) => {
  const { query } = req.query;
  try {
    const result = await client.search({
      index: 'notes',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['title', 'content'],
          },
        },
      },
    });
    res.send(result.hits.hits);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching notes');
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
