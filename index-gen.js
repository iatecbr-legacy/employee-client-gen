const GeneratorFactory = require('./generators/GeneratorFactory');

async function run() {
    let args = process.argv.slice(2);
    if (args.length <= 0) {
        console.log('Missing FORMAT argument');
    } else {
        let format = args[0];
        let generator = new GeneratorFactory().createGenerator(format);
        try {
            await generator.generate();
        } catch (err) {
            console.error(err);
        }
    }
}
run();