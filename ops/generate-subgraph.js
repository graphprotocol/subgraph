const fs = require('fs');
const path = require('path');
const glob = require('glob');
const yaml = require('js-yaml');
const { migrationFileLocation, subgraphyamlLocation, workingDir } = require('./settings');

/**
 * Generate a `subgraph.yaml` file from `datasource.yaml` fragments in `mappings` directory and `migration.json`
 */
async function generateSubgraph() {
	const migrationFile = migrationFileLocation;
	const addresses = JSON.parse(fs.readFileSync(migrationFile, 'utf-8'));

	const mappingDir = path.resolve(`${workingDir}/src/mappings`)
	const files = await new Promise((res, rej) =>
		glob(`${mappingDir}/**/datasource.yaml`, (err, files) => (err ? rej(err) : res(files)))
	);
	if (files.length === 0) {
		throw Error(`No source mappings found in ${mappingDir}`)
	}
	const dataSources = files.map(file => {
		const contract = path.basename(path.dirname(file));
		const { abis, entities, eventHandlers } = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));

		const contractAddress = addresses.private.base[contract] || addresses.private.dao[contract];

		if (!contractAddress) {
			throw Error(`Address for contract ${contract} not found in ${migrationFile}`);
		}
		return {
			kind: 'ethereum/contract',
			name: `${contract}`,
			source: {
				address: contractAddress,
				abi: abis && abis.length ? abis[0] : contract,
			},
			mapping: {
				kind: 'ethereum/events',
				apiVersion: '0.0.1',
				language: 'wasm/assemblyscript',
				file: path.join(path.dirname(file), 'mapping.ts'),
				entities,
				abis: (abis || [contract]).map(contract => ({ name: contract, file: `${workingDir}/abis/${contract}.json` })),
				eventHandlers,
			},
		};
	});

	const subgraph = {
		specVersion: '0.0.1',
		schema: { file: './schema.graphql' },
		dataSources,
	};

	fs.writeFileSync(subgraphyamlLocation, yaml.safeDump(subgraph, { noRefs: true }), 'utf-8');
}

if (require.main === module) {
	generateSubgraph().catch((err)  => { console.log(err); process.exit(1) });
} else {
	module.exports = generateSubgraph;
}
