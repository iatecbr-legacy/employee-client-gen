const CONFIG = require('./config.json');
const GeneratorFactory = require('./generators/GeneratorFactory');

const program = require('commander');

program
 .version(CONFIG.version)
 .command('gen [format]', 'Generate the client in the specified format.', {isDefault: true})
 .command('push [format]', 'Push generated files to GitHub.')
 .command('publish [format]', 'Publish generated (format specific).')
 .parse(process.argv);
