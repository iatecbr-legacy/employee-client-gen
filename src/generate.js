let generators = require('./generators.json');

let args = process.argv.slice(2);
if (args.length <=0) {
    console.log('Missing FORMAT argument');
} else {
    let format = args[0].toLowerCase();
    if (format in generators) {
        console.log('Found generator for', format);
        let clss = require(`./${generators[format]}`);
        var generator = new clss();
    } else {
        console.log('Using default generator')
        let importName = `./${generators['DEFAULT']}`;
        let clss = require(importName)(format);
        var generator = new clss(format)
    }
    console.log(generator);
    generator.generate();
}