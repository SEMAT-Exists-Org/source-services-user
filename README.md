### User Service

User service is responsible for providing user resources to client applications and other SEMAT services. 

User service exposes a set of API resources.

User service is a NodeJS application. In order to run this service on your own local host, you have to have [NodeJS (and npm) installed](https://nodejs.org/en/).

Next, get [Grunt](http://gruntjs.com/getting-started) installed on your dev mashine if you dont have it.

	npm install -g grunt-cli
	
Next, clone the the git source code of this repository. After clonning the git repository, go to the the directory created by git and run npm command to install required dependencies

	npm install
	
After npm finishes installing all dependencies, you can start the service with 

	grunt serve
	
By default application will be listening on localhost port 8001

by [@sauliuz](https://github.com/sauliuz)