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
let format = argv.splice(0,1)[0].toLowerCase();
let command = argv.splice(0,1)[0].toLowerCase();

console.log('ARGS', format, command);
switch(command) {
    case 'gen':
    case 'generate':
        generator.generate(argv);
        break;
    case 'push':
        generator.gitPush(argv);
        break;    
    case 'publish':
        generator.publish(argv);
        break;   
        
    default:
        console.log('Invalid Command:', command);
        showUsage();
        break;
}    