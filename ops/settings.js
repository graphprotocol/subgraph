const path = require('path');
const workingDir = path.resolve('.')
const migrationFileLocation = path.resolve(`${workingDir}/migration.json`);
const subgraphyamlLocation = path.resolve(`${workingDir}/subgraph.yaml`);

module.exports = {
  migrationFileLocation,
  subgraphyamlLocation,
  workingDir
};
