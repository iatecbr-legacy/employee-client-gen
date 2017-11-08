const util = require('util');
const fs = require('fs');
const child_process = require('child_process');
const execFile = util.promisify(child_process.execFile);

const BaseGenerator = require('./BaseGenerator')

function removedirs(dirs) {
  for (let dir of dirs) {
    if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory())
      shutil.rmtree(dir);
  }
}
class GenericGenerator extends BaseGenerator {
  constructor(format) {
    super();
    this.format = format;
    console.log('passou no ctor');
  }
  parseOptions() {
    let filename = `options/${this.format}.json`;
    if (!fs.existsSync(filename))
      return false;
    let file = fs.createReadStream(filename);
    let content = file.read();
    try {
      return JSON.parse(content);
    } catch (ex) {
      return false;
    }
    return false;
  }
  async generate() {
    let options = parseOptions();
    if (!options) {
      throw 'The format code supplied to the generator is invalid.';
    }
    
    super.generate();
    //removedirs(['api','model']);

    let langArgs = {
        'npmVersion': this.SPEC_VERSION,
        'npmName': 'iatec-ng-employeeclient',
    };
    let javaArgs = [//'java',
        '-jar', this.codegenName,
        'generate',
        '-i', this.SPEC_URL,
        '-l', 'typescript-angular2',
        '-o', 'gen/iatec-ng-employeeclient',
    ];
    for (let k of Object.keys(langArgs)) {
      let v = langArgs[k];
      javaArgs = javaArgs.concat(util.format('-D%s=%s', k, v));
    }
    console.log('Running codegen...');
    try {
      let result = await execFile('java', javaArgs);
      console.log('Codegen success.')
    } catch (err) {
      console.error(err.toString());
    }
  }
}