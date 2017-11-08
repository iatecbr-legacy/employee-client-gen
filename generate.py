#!/bin/env python
from flatten.flatten import flattenlist
from subprocess import call

import os, shutil
import urllib2

def removedirs(dirs):
    for dir in dirs:
        if os.path.isdir(dir): shutil.rmtree(dir)

CODEGEN_VERSION = '2.2.3'
CODEGEN_NAME = 'swagger-codegen-cli-%s.jar' % CODEGEN_VERSION
def ensure_codegen():
    if not os.path.isfile(CODEGEN_NAME):
        url = 'http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/%s/%s' % (CODEGEN_VERSION, CODEGEN_NAME)
        print 'Downloading codegen from', url
        response = urllib2.urlopen(url)
        content = response.read()
        with open(CODEGEN_NAME, 'wb+') as file:
            file.write(content)
        response.close()
        
    
VERSION_NUMBER = '1.0.0-preview-1'
SPEC_URL = 'https://app.swaggerhub.com/apiproxy/schema/file/iatec/Employee/%s/swagger.yaml' % VERSION_NUMBER

removedirs(['api','model'])

langArgs = {
    'npmVersion': VERSION_NUMBER,
    'npmName': 'iatec-ng-employeeclient',
} 
codegencmd = ['java',
    '-jar', CODEGEN_NAME,
    'generate',
    '-i', SPEC_URL,
    '-l', 'typescript-angular2',
    '-o', 'gen/iatec-ng-employeeclient',
]
for k, v in langArgs.items():
    codegencmd.append('-D%s=%s' % (k, v))

ensure_codegen()
call(codegencmd, shell=True)