const express = require('express');
const {
  readMissionsData,
  writeNewMissionData,
  updateMissionData,
  deleteMissionData,
} = require('./utils/fsUtils');

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

app.put('/missions/:id', async (request, response) => {
  const { id } = request.params;
  const { name, description, distance, travel } = request.body;

  const mission = await updateMissionData(id, {
    name,
    description,
    distance,
    travel,
  });

  return response.status(201).json({ mission });
});

app.delete('/missions/:id', async (request, response) => {
  const { id } = request.params;
  const mission = await deleteMissionData(id);

  return response.status(204).json({ message: mission.message });
});

module.exports = app;
