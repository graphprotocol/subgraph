const path = require('path');
const workingDir = path.resolve(`${__dirname}/..`)
const migrationFileLocation = path.resolve(`${workingDir}/migration.json`);
const subgraphyamlLocation = path.resolve(`${workingDir}/subgraph.yaml`);

module.exports = {
  migrationFileLocation,
  subgraphyamlLocation,
  workingDir
};
