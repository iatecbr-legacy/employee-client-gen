const util = require('util');
const fs = require('fs');
const exec = require('child_process').exec;

class BaseGenerator {
  constructor(format) {
    this.format = format;
    this.CODEGEN_VERSION = '2.2.3';
    this.SPEC_VERSION = '1.0.0-preview-1';
    this.SPEC_URL = util.format('https://app.swaggerhub.com/apiproxy/schema/file/iatec/Employee/%s/swagger.yaml', this.SPEC_VERSION);
    try {
      this.options = require(`../options/${format}.json`);
    } catch (err) { 
      this.options = null;
    }
  }
  
  ensureCodegen() {
    let codegenName = util.format(`swagger-codegen-cli-%s.jar`, this.CODEGEN_VERSION);
    if (fs.existsSync(codegenName)) {
      console.log('Codegen was already downloaded');
    } else {
      let codegenUrl = util.format('http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/%s/%s', this.CODEGEN_VERSION, codegenName);
      console.log('Downloading codegen from', codegenUrl);
      let file = fs.createWriteStream(codegenName);
      http.get(codegenUrl, response => {
        response.pipe(file);
      });
    }
    return codegenName;
  }
  async runCodegen() {
    let javaArgs = [
      '-jar', this.codegenName,
      'generate',
      '-i', this.SPEC_URL,
      '-l', 'typescript-angular2',
      '-o', this.outdir,
    ];
    if ('languageArgs' in this.options) {
      if ('languageArgVersionName' in this.options) {
        this.options.languageArgs[this.options.languageArgVersionName] = this.SPEC_VERSION;
      }
      Object.keys(this.options.languageArgs).forEach(k=> {
        javaArgs.push(`-D${k}=${this.options.languageArgs[k]}`);
      });
    }
    console.log('Running codegen...');
    await this.runcmd('java ' + javaArgs.join(' '));
  }
  generate() {
    this.codegenName = this.ensureCodegen();
  }
  runcmd(cmd, workingdir){
    return new Promise((resolve, reject) => {
      let child = exec(cmd, {'cwd': workingdir || process.cwd() }, (err, stdout, stderr) =>{
        if (!err) resolve(stdout);
        else reject(err);
      });
      child.stderr.pipe(process.stdout);
      child.stdout.pipe(process.stdout);
    });
  }
}
module.exports = BaseGenerator;
