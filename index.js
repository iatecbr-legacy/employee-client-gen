const CONFIG = require('./config.json');
const GeneratorFactory = require('./generators/GeneratorFactory');

const program = require('commander');

__format = process.argv.splice(2,1)[0]
program
 .version(CONFIG.version)
 .usage('[format] <command>')
 .command('gen', 'Generate the client in the specified format.', {isDefault: true})
 .command('push', 'Push generated files to GitHub.')
 .command('publish', 'Publish generated (format specific).')
 .parse(process.argv);


