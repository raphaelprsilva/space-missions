const express = require('express');
const { readMissionsData, writeNewMissionData } = require('./utils/fsUtils');

const app = express();

app.use(express.json());

app.get('/missions', async (request, response) => {
  const missions = await readMissionsData();
  return response.json({ missions });
});

app.post('/missions', async (request, response) => {
  const { name, description, distance, travel } = request.body;

  const newMission = await writeNewMissionData({
    name,
    description,
    distance,
    travel,
  });

  return response.json({ mission: newMission });
});

module.exports = app;
