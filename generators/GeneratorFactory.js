const CONFIG = require('../config.json');

module.exports = class GeneratorFactory {
    createGenerator(format) {
        if (format in CONFIG.generators) {
            var genclass = require(`../generators/${CONFIG.generators[format]}`);
        } else {
            var genclass = require(`../generators/${CONFIG.defaultGenerator}`);
        }
        return new genclass(format);
    }
}