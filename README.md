MicroChasm Ecosystem
=============================================================================
A microchasm is an ecosystem comprised of separated, independent services(micro variety) that share a common collaborative purpose. The pseudo-autonomous nature of each service is complimented by collaboration across the chasm of services. 

## microchasm
 The microchasm library provides a conduit for rapidly composing microservice ecosystems through scaffolding mechanisms for the microchasm, microservices, microapis and other components as well as tooling for build, deployment, and other full stack services.

>### Components:
+ **slush-mchasm**- Scaffolding tooling to generate a new microchasm ecosystem
>>Sub-generators:
>>1. `mchasm:microservice`
>>2. `mchasm:microapi`
>>3. `mchasm:nanostack`
+ **[microstack](./slush-mChasm/templates/microstack/README.md)** - Centralized information stores for microservice collaboration topology
+ **[twiglet](./slush-mChasm/templates/twiglet/README.md)** - Logging tooling for collaboratively felling microservices 
+ **[sips](./slush-mChasm/templates/sips/README.md)** - Centralized build and deployment tooling for microchasm services

## Dependencies 
The following external and peer dependencies currently exist.
>+ Node.js ^0.12.4 with NPM ^2.10.1 (tested with node v0.12.4 and npm v2.10.1)
+ Depends on the local **twiglet** module as a peer project for logging. _This dependency may move to an external repo at some point_
+  Depends on the local **microstack** module as a peer project for logging. _This dependency may move to an external repo at some point_
+ **[rekuire](https://github.com/nadav-dav/rekuire)** used to load some modules.
+ **[swagger](http://swagger.io)** and **[hapi-swagger](https://github.com/glennjones/hapi-swagger)** used to keep realtime API documentation in sync.
+ **[hapijs](http://hapijs.com/)** used to create microservices, microapi plugins, mircolib plugins.
+ **[lab](https://github.com/hapijs/lab)** and **[code](https://github.com/hapijs/code)** used to create tests  


## Getting Started
>## [Creating a microchasm](./slush-mChasm/docs/MCHASMSETUP.md)
## [Adding a microservice to your microchasm](./slush-mChasm/docs/MICROSERVICESETUP.md)
## [Adding a microapi to your microservice](./slush-mChasm/docs/MICROAPISETUP.md)
## [Full sample instructions using docker/docker-compose](./slush-mChasm/docs/SAMPLEINSTRUCTIONSWITHDOCKER.md)
