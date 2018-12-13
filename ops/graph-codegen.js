const { runGraphCli } = require('./graph-cli.js');
const { subgraphyamlLocation, workingDir } = require('./settings.js')

async function codegen(cwd) {
  const result = await runGraphCli([
    'codegen',
    `--output-dir ${__dirname}/../src/types/`,
    subgraphyamlLocation
  ], cwd);
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
