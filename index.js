const CONFIG = require('./config.json');
const BaseGenerator = require('./generators/BaseGenerator');

const program = require('commander');

program
 .version('1.0.0-preview-1')
 //.command('generate [format]', 'Generate the client in the specified format.', {isDefault: true})
 .parse(process.argv);


let args = process.argv.slice(2);
if (args.length <=0) {
    console.log('Missing FORMAT argument');
} else {
    let format = args[0];
    let generator = BaseGenerator.createGenerator(format);
    console.log(generator);
    generator.generate()
        .catch(err=>console.error(err))
        ;
}