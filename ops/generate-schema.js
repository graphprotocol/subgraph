const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { workingDir } = require('./settings')
/**
 * Merge all schemas (files with `.graphql` extension) from `mappings` into a single schema
 */
async function generateSchema() {
	const mappingsDir = path.resolve(`${__dirname}/../src/mappings`)
	const files = await new Promise((res, rej) =>
		glob(path.resolve(`${mappingsDir}/**/schema.graphql`), (err, files) => (err ? rej(err) : res(files)))
	);
	if (!files) {
		throw Error('No mapping files found in ${_dirname}/../src/mapping')
	}
	const schema = [...files, `${__dirname}/../src/domain/schema.graphql`]
		.map(file => {
			const name = path.basename(path.dirname(file));
			const content = fs.readFileSync(file, 'utf-8');
			return `# START ${name}\n${content}\n# END ${name}`;
		})
		.join('\n\n');

	fs.writeFileSync(`${workingDir}/schema.graphql`, schema, 'utf-8');
}

if ((require.main === module)) {
	generateSchema().catch((err)  => { console.log(err); process.exit(1) })
} else {
	module.exports = generateSchema;
}
