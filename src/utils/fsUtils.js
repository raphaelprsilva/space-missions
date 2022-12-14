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

const updateMissionData = async (id, newMissionData) => {
  try {
    const updatedMission = { id: Number(id), ...newMissionData };
    const missions = await readMissionsData();
    const newMissions = missions.map((mission) => {
      if (mission.id === Number(id)) {
        return {
          ...mission,
          ...newMissionData,
        };
      }
      return mission;
    });
    await fs.writeFile('./data/missions.json', JSON.stringify(newMissions));
    return updatedMission;
  } catch (err) {
    console.error(err);
  }
};

const deleteMissionData = async (id) => {
  try {
    const missions = await readMissionsData();
    const newMissions = missions.filter((mission) => mission.id !== Number(id));

    if (newMissions.length === missions.length) {
      throw new Error('Mission not found');
    }

    await fs.writeFile('./data/missions.json', JSON.stringify(newMissions));
    return {
      message: `Mission with id ${id} was deleted`,
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  readMissionsData,
  writeNewMissionData,
  updateMissionData,
  deleteMissionData,
};
