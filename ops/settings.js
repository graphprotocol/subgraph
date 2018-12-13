const path = require('path');
const migrationFileLocation = path.resolve(`${__dirname}/../migration.json`);
const subgraphyamlLocation = path.resolve(`${__dirname}/../subgraph.yaml`);

module.exports = {
  migrationFileLocation,
  subgraphyamlLocation
};
