// Jenkinsfile for CD pipeline

node {

   // Mark the code checkout 'stage'....
   stage 'Code checkout'

   // Get code from this GitHub repository
   checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/semat-exists-org/source-services-user.git']]])

   // Dependencies 'stage'....
   stage 'Install dependencies'
   // Install npm dependencies
   sh 'npm install'

   // Testing stage
   stage 'Testing Stage'
   // running virtual xvfb for Electron tests
   sh 'grunt serve'
   sh 'grunt test'

   // Mark the code 'last stage'....
   stage 'Validate Test Run'
   echo 'tests validated, ready to proceed..'

}