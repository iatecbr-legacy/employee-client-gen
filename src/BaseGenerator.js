const util = require('util');
const fs = require('fs');


class BaseGenerator {
  constructor() {
    this.CODEGEN_VERSION = '2.2.3';
    this.SPEC_VERSION = '1.0.0-preview-1';
    this.SPEC_URL = util.format('https://app.swaggerhub.com/apiproxy/schema/file/iatec/Employee/%s/swagger.yaml', this.SPEC_VERSION);
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
  generate() {
    this.codegenName = this.ensureCodegen();
  }
}
module.exports = BaseGenerator;
