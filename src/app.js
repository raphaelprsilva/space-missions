const express = require('express');
const { readMissionsData } = require('./utils/fsUtils');

const app = express();

app.use(express.json());

app.get('/missions', async (request, response) => {
  const missions = await readMissionsData();
  return response.json({ missions });
});

module.exports = app;
