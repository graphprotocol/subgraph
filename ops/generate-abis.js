const fs = require('fs');
const path = require('path');
const { workingDir } = require('./settings')
/**
 * Fetch all abis from @daostack/arc into the `abis` folder.
 */
async function generateAbis() {
	const base = require('path').dirname(require.resolve('@daostack/arc/build/contracts/UController.json'));
	const abiOutputDir = path.resolve(`${workingDir}/abis`)
	if (!fs.existsSync(abiOutputDir)) {
		fs.mkdirSync(abiOutputDir);
	}
	const files = fs.readdirSync(base);
	files.forEach(file => {
		const abi = JSON.parse(fs.readFileSync(path.join(base, file), 'utf-8')).abi;
		fs.writeFileSync(path.join(abiOutputDir, file), JSON.stringify(abi, undefined, 2), 'utf-8');
	});
}

if (require.main === module) {
	generateAbis().catch((err)  => { console.log(err); process.exit(1) })
} else {
	module.exports = generateAbis;
}
