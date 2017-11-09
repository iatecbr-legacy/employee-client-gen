const util = require('util');
const fs = require('fs');
const path = require('path');
const rimraf = util.promisify(require('rimraf'));

const BaseGenerator = require('./BaseGenerator')

module.exports = class Angular2Generator extends BaseGenerator {
  async generate() {
    await super.generate();
    
    this.pkgfilename = this.outdir + '/package.json';
    
    let pkgdict = this.options.packagesToUpdate;
    this.pkgs2update = Object.keys(pkgdict).map(x=> new Object({ key: x, value: pkgdict[x]}));

    await this.npmInstall();
    await this.fixBuildScript();
    await this.updatePackages();
    await this.updatePeers();
    await this.fixOpaqueToken();
    await this.createModule();
    await this.build();
  }
  async fixBuildScript() {
    console.log(`Fixing package.json build script from ${this.outdir}...`);
    let pkgjson = JSON.parse(fs.readFileSync(this.pkgfilename));
    pkgjson.scripts.build = pkgjson.scripts.build.replace("typings install && ", "");
    await fs.writeFileSync(this.pkgfilename, JSON.stringify(pkgjson, null, 2));
  }
  async updatePackages() {
    let result;

    console.log('Removing the typings package...');
    await this.runcmd('npm uninstall --save-dev typings', this.outdir);

    fs.unlinkSync(this.outdir + '/typings.json');
    await rimraf(this.outdir + '/typings');
    
    let pkgs = this.pkgs2update.map(x=>`${x.key}@${x.value}`).join(' ');
    console.log('Updating node packages...', pkgs);
    await this.runcmd('npm install ' + pkgs + ' --save-dev', this.outdir);
  }
  async updatePeers() {
    console.log('Updating peer dependencies...');
    let pkgjson = JSON.parse(fs.readFileSync(this.pkgfilename));
    for (let pkg of this.pkgs2update) {
      if (pkg.key in pkgjson.peerDependencies) {
        pkgjson.peerDependencies[pkg.key] = pkg.value;
      }
    }
    await fs.writeFileSync(this.pkgfilename, JSON.stringify(pkgjson, null, 2));    
  }
  async fixOpaqueToken() {
    console.log(`Fixing package.json build script from ${this.outdir}...`);
    let pkgfilename = this.outdir + '/variables.ts';
    let content = fs.readFileSync(pkgfilename).toString();
    content = content.split('OpaqueToken').join('InjectionToken');
    await fs.writeFileSync(pkgfilename, content);
  }
  async createModule() {
    fs.copyFileSync('assets/angular2-api.module.ts.txt', this.outdir + '/api.module.ts');
    fs.copyFileSync('assets/angular2-.npmignore.txt', this.outdir + '/.npmignore');
    fs.appendFileSync(this.outdir + '/index.ts', "\r\nexport * from './api.module';");
  }
  async npmInstall() {
    console.log('Running "npm install"')
    await this.runcmd('npm install', this.outdir);
  }
  async build() {
    console.log('Running "npm run build"')
    await this.runcmd('npm run build', this.outdir);
  }
  async publish(argv) {
    await this.runcmd('npm publish', this.outdir);
  }
}