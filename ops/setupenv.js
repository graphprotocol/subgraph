const deployDaoStack = require('./deployDaoStack').deployDaoStack;
const subgraphRepo = '..';
const graphCli = require(`./graph-cli`);

async function main () {
  const provider = 'http://localhost:8545';
  // const subgraphRepo = require.resolve('@daostack/subgraph');
  console.log(`Deploying Daostack contracts to ${provider}`);
  let { options, migrationResult } = await deployDaoStack({ provider });
  console.log(`Deployed Daostack contracts, information written to ${options.output}`);

  console.log(`Generating ABI files`);
  // node ops/generate-abis.js && node ops/generate-schema.js && node ops/generate-subgraph.js
  await require(`${subgraphRepo}/ops/generate-abis`)();

  console.log(`Generating schemas`);
  await require(`${subgraphRepo}/ops/generate-schema`)();

  console.log(`Generating subgraph`);
  const generateSubgraph = require(`${subgraphRepo}/ops/generate-subgraph`);
  await generateSubgraph();

  const cwd = subgraphRepo;
  console.log('CodeGen');
  const result = await graphCli.codegen(cwd);
  console.log(result);

  console.log('Deploying subgraph configuration');
  const deploymentResult = await graphCli.deploy(cwd);
  // deploymentResult[0] is the status code
  // but it is not very helpful, because it returns 0 also on some errors
  // console.log(deploymentResult[0])
  const msg = deploymentResult[1];
  if (msg.toLowerCase().indexOf('error') > 0) {
    console.log(msg);
    throw Error(msg);
  } else {
    console.log(msg);
    console.log(`All done!`);
  }
}

main().catch(error => {
  console.log(error);
});