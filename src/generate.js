let generators = require('./generators.json');

let args = process.argv.slice(2);
if (args.length <=0) {
    console.log('Missing FORMAT argument');
} else {
    let format = args[0].toLowerCase();
    if (format in generators) {
        console.log('format', format);
        var generator = require(`./${generators[format]}`);
        console.log(generator);
    } else {
        let importName = `./${generators['DEFAULT']}`;
        let clss = require(importName)(format);
        var generator = clss(format)
    }
    console.log(generator);
    generator.generate();
}