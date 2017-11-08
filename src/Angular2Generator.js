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
module.exports = class Angular2Generator extends BaseGenerator {
  async generate() {
    super.generate();
    //removedirs(['api','model']);

    let npmPackageName = 'iatec-ng-employeeclient';
    let langArgs = {
        'npmVersion': this.SPEC_VERSION,
        'npmName': npmPackageName,
    };
    this.outdir = 'gen/' + npmPackageName;
    let javaArgs = [//'java',
        '-jar', this.codegenName,
        'generate',
        '-i', this.SPEC_URL,
        '-l', 'typescript-angular2',
        '-o', this.outdir,
    ];
    for (let k of Object.keys(langArgs)) {
      let v = langArgs[k];
      javaArgs = javaArgs.concat(util.format('-D%s=%s', k, v));
    }
    console.log('Running codegen...');
    try {
      let result = await execFile('java', javaArgs);
      console.log('Codegen success.');
    } catch (err) {
      console.error(err.toString());
    }
    this.fixPkgJson();
  }
  fixPkgJson() {
    let pkgfilename = this.outdir + '/package.json';
    let pkgjson = JSON.parse(fs.readFileSync(pkgfilename));
    pkgjson["scripts"]["build"] = pkgjson["scripts"]["build"].replace("typings install && ", "");
    fs.writeFileSync(pkgfilename, JSON.stringify(pkgjson, null, 2));
  }
}