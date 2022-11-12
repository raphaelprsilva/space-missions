const readLineSync = require('readline-sync');

const { writeNewMissionData } = require('./utils/fsUtils');

const main = async () => {
  const missionName = readLineSync.question('Enter mission name: ');
  const missionDescription = readLineSync.question(
    'Enter mission description: ',
  );
  const missionDistance = readLineSync.question('Enter mission distance: ');
  const missionTravelTime = readLineSync.question(
    'Enter mission travel time: ',
  );

  await writeNewMissionData({
    name: missionName,
    description: missionDescription,
    distance: missionDistance,
    travel: missionTravelTime,
  });
};

main();
