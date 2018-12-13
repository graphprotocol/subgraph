const { runGraphCli } = require('./graph-cli.js');
const { subgraphyamlLocation } = require('./settings.js')

async function codegen(cwd) {
  const result = await runGraphCli([
    'codegen',
    '--output-dir src/types/',
    subgraphyamlLocation
  ], cwd);
  console.log(result);
  if (result[0] === 1) {
    throw Error(`Codegen failed! ${result}`);
  }
  return result;
}

if (require.main === module) {
	codegen().catch((err)  => { console.log(err); process.exit(1) })
} else {
	module.exports = codegen;
}
