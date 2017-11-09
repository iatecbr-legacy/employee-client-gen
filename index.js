const CONFIG = require('./config.json');
const GeneratorFactory = require('./generators/GeneratorFactory');

const program = require('commander');

program
 .version('1.0.0-preview-1')
 .command('gen [format]', 'Generate the client in the specified format.', {isDefault: true})
 .command('push [format]', 'Push changes to GitHub.')
 .parse(process.argv);
