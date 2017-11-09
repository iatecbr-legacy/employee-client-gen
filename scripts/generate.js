let generators = require('./generators.json');

let args = process.argv.slice(2);
if (args.length <=0) {
    console.log('Missing FORMAT argument');
} else {
    let format = args[0].toLowerCase();
    if (format in generators) {
        console.log('Found generator for', format);
        var genclass = require(`./${generators[format]}`);
    } else {
        console.log('Using default generator')
        var genclass = require(`./${generators['DEFAULT']}`);
    }
    let generator = new genclass(format);
    console.log(generator);
    generator.generate()
        .catch(err=>console.error(err))
        ;
}