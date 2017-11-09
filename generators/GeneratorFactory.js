const CONFIG = require('../config.json');

module.exports = class GeneratorFactory {
    createGenerator(format) {
        if (format in CONFIG.generators) {
            var genName = CONFIG.generators[format];
        } else {
            var genName = CONFIG.defaultGenerator;
        }
        let genclass = require(`./${genName}`);
        return new genclass(format);
    }
}