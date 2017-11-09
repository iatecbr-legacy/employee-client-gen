const GeneratorFactory = require('./generators/GeneratorFactory');

async function run() {
    let generator = new GeneratorFactory().createGenerator(__format);
    try {
        await generator.publish();
    } catch (err) {
        console.error(err);
    }
}
run();