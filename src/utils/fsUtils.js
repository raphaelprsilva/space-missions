const fs = require('fs').promises;

const readMissionsData = async () => {
  try {
    const data = await fs.readFile('./data/missions.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

const writeNewMissionData = async (data) => {
  try {
    const missions = await readMissionsData();
    const lastMissionId = missions[missions.length - 1].id;
    const newMission = {
      id: lastMissionId + 1,
      ...data,
    };
    const newMissions = [...missions, newMission];

    await fs.writeFile('./data/missions.json', JSON.stringify(newMissions));
    return newMission;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  readMissionsData,
  writeNewMissionData,
};
