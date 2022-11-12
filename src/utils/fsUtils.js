const fs = require('fs').promises;

const readMissionsData = async () => {
  try {
    const data = await fs.readFile('./data/missions.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

const writeMissionsData = async (data) => {
  try {
    await fs.writeFile('./data/missions.json', JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  readMissionsData,
  writeMissionsData,
};
