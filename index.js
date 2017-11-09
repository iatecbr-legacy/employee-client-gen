const CONFIG = require('./config.json');
const program = require('commander');

program
 .version('1.0.0-preview-1')
 //.command('generate [format]', 'Generate the client in the specified format.', {isDefault: true})
 .parse(process.argv);


let args = process.argv.slice(2);
if (args.length <=0) {
    console.log('Missing FORMAT argument');
} else {
    let format = args[0].toLowerCase();
    if (format in CONFIG.generators) {
        console.log('Found generator for', format);
        var genclass = require(`./generators/${CONFIG.generators[format]}`);
    } else {
        console.log('Using default generator')
        var genclass = require(`./generators/${CONFIG.defaultGenerator}`);
    }
    let generator = new genclass(format);
    console.log(generator);
    generator.generate()
        .catch(err=>console.error(err))
        ;
}