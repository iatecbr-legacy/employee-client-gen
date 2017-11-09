const CONFIG = require('./config.json');
const GeneratorFactory = require('./generators/GeneratorFactory');

function showUsage() {
    console.log(
        `Usage: <format> <command>
            
            Formats:
                angular2
        
            Commands:
                gen, generate       Generates the project
                push                Push the project to GitHub
                publish             Publish the package (format specific)
        `);
}
let argv = process.argv.slice(2);
if (argv <=2) {
    showUsage();
    process.exit();
}
let format = argv[0].toLowerCase();
let command = argv[1].toLowerCase();
let generator = new GeneratorFactory().createGenerator(format);


console.log('ARGS', format, command);
switch(command) {
    case 'gen':
    case 'generate':
        generator.generate();
        break;
    case 'push':
        generator.gitPush();
        break;    
    case 'publish':
        generator.publish();
        break;   
        
    default:
        console.log('Invalid Command:', command);
        showUsage();
        break;
}    