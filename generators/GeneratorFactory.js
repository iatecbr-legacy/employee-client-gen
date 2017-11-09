const CONFIG = require('../config.json');

module.exports = class GeneratorFactory {
    createGenerator(format) {
        if (format in CONFIG.generators) {
            console.log('Found generator for', format);
            var genclass = require(`../generators/${CONFIG.generators[format]}`);
        } else {
            console.log('Using default generator')
            var genclass = require(`../generators/${CONFIG.defaultGenerator}`);
        }
        return new genclass(format);
    }
}