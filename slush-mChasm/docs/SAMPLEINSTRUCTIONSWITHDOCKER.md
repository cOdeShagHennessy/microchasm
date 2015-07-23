How to create a new _microchasm_ with docker/docker-compose
=============================================================================
Explains how to use slush-mchasm to scaffold a microchasm with microservices containing a microapi. Also, includes using
docker and docker-compose to run these services along with redis integration (if desired).

# Prereqs
 
>## Docker Installation
 1. [Docker](https://docs.docker.com/installation/#installation) ([boot2docker](https://docs.docker.com/installation/mac/#install-boot2docker) for OSX)
 2. [Docker Compose](https://docs.docker.com/compose/)
 3. Clone repo
 
>## _microchasm_ Setup
 1. Clone `microchasm` repo
 1. Change directory to the cloned repo
 ``` $ cd microchasm ```
 1. Install `slush` and `slush-mchasm` globally
 ``` $ npm install -g slush slush-mchasm ```
 
# Usage
>## Create _microchasm_
 1. Create a directory for the microchasm `$ mkdir orgchasm`
 1. Change directory to the microchasm `$cd orgchasm`
 1. Generate microchasm scaffolding `$ slush mchasm`

>## Generate base docker images for _microchasm_
1. ```$sh build-docker.sh``` 

>## Add microservice 
 1. ```slush mchasm:microservice``` (e.g. microservice name = **dleague**, service port = 9081)
 1. Answer questions 

>## Register microservice for use with docker-compose
###**(THIS IS NOW AUTOMATICALLY PERFORMED BY SCAFFOLDING GENERATOR)** 
1. Open /orgchasm/dleague/paste-in-docker-compose.yml -->select all-->copy 
1. Open /orgchasm/docker-compose.yml --> paste at 
```#Paste snippet from paste-in-docker-compose.yml from your microservice above here``` 
1. Launch _dleague_ microservice (and redis) 
```docker-compose up``` for 1st launch
```docker-compose start``` subsequent launches
1. Browse the _orgchasm_ Swagger API Documentation ```http://docker_ip:9081``` 

>## Add microapi
 1. Change directory to your microservice
 ```cd dleague```
 1. Create microapi 
 ```slush mchasm:microapi``` (e.g. microapi name = users)
 1. Register microapi with _dleague_ microservice
 ```open orgchasm/dleague/manifest.js```
 1. **(THIS IS NOW AUTOMATICALLY PERFORMED BY SCAFFOLDING GENERATOR)** 
 add users registration: 
             ```'./apis/users': [{
                routes: {
                    prefix: '/users'
                }
            }],```
 + If the microservice was previously started with docker-compose, refreshing the browser will update the swagger api documentation with the new api
 
# Tips
+ In your shell alias docker-compose to something much shorter to type, _e.g. **dc**_. You commands can then become something more like: 
```$ dc up```
```$ dc ps```
```$ dc start redis```
```$ dc logs dleague```
```$ dc stop dleague```
