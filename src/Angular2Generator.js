const util = require('util');
const fs = require('fs');
const path = require('path');

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
    this.npmPackageName = 'iatec-ng-employeeclient';
    this.outdir = 'gen/' + this.npmPackageName;
    
    //removedirs(['api','model']);
    
    await this.generateProject();
    await this.fixPkgJson();
    await this.changePackages();
    await this.fixOpaqueToken();
  }
  async generateProject() {
    let langArgs = {
        'npmVersion': this.SPEC_VERSION,
        'npmName': this.npmPackageName,
    };
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
    // try {
    await this.runcmd('java ' + javaArgs.join(' '));
    //   console.log('Codegen success.');
    // } catch (err) {
    //   console.error(err.toString());
    // }
  }
  async fixPkgJson() {
    console.log(`Fixing package.json build script from ${this.outdir}...`);
    let pkgfilename = this.outdir + '/package.json';
    let pkgjson = JSON.parse(fs.readFileSync(pkgfilename));
    pkgjson["scripts"]["build"] = pkgjson["scripts"]["build"].replace("typings install && ", "");
    await fs.writeFileSync(pkgfilename, JSON.stringify(pkgjson, null, 2));
  }
  async changePackages() {
    let result;

    console.log('Running npm install')
    result = await this.runcmd('npm install', this.outdir);
    if (!result) throw 'Could not run npm install: ' + result;

    console.log('Removing the typings package...');
    result = await this.runcmd('npm uninstall --save-dev --save-peer typings', this.outdir);
    if (!result) throw 'Could not remove typings: ' + result;

    let pkglist = [
      "@angular/common@^5.0.0",
      "@angular/compiler@^5.0.0",
      "@angular/core@^5.0.0",
      "@angular/http@^5.0.0",
      "@angular/platform-browser@^5.0.0",
      "core-js@^2.4.1",
      "rxjs@^5.5.2",
      "typescript@^2.4.2",
      "zone.js@^0.8.14"
    ]
    let pkgs = pkglist.join(' ');
    console.log('Updating node packages...')
    result = await this.runcmd('npm install --save-dev --save-peer ' + pkgs, this.outdir);
    if (!result) throw 'Could not update the node packages: ' + result;
  }
  async fixOpaqueToken() {
    console.log(`Fixing package.json build script from ${this.outdir}...`);
    let pkgfilename = this.outdir + '/variables.ts';
    let content = fs.readFileSync(pkgfilename).toString();
    content = content.split('OpaqueToken').join('InjectionToken');
    await fs.writeFileSync(pkgfilename, content);
  }
}