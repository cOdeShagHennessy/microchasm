Centralized information stores for microservice collaboration topology
=============================================================================
Define stack topology of microservices architecture for message queueing exchanges, queues, etc. in terms of a collection of nanostacks.

>## Nanostack
 A nanostack is a collection of domain, workflow, or interaction specific properties to configure topology, e.g. a particular RabbitMQ server and the set of exchanges and queues defining a problem domain. A collection of nanostacks is a microstack.  

A nanostack:

 + Is identified by a key, i.e. `['cOdeShagNanostack']`
 + Defines a schema for validation using Joi
 + Properties can be configured per environment e.g. _development, production, local_docker, etc._ as set in the environment varialbe _**NODE_ENV**_
  
  ``` cd node_beanstalk_docker_deploy ```

>## Prereqs
 The following external and peer dependencies currently exist.

 + Depends on the local **twiglet** module as a peer project for logging. _This dependency may move to an external repo at some point_
 + Defines a schema for validation using **[Joi](https://github.com/hapijs/joi)**
 + Properties overriden per environment using **[confidence](https://github.com/hapijs/confidence)** e.g. _development, production, local_docker, etc._ as set in the environment varialbe _**NODE_ENV**_
 + **[rekuire](https://github.com/nadav-dav/rekuire)** used to load nanostacks. So new nanostacks must either be: 
    + added somewhere under the **_microstack_** directory
    + created as a peer, local module and added as a local dependency to package.json (requires a subsquenent `npm install`)

  >### Sample Structure 1
  ``` 
/microstack -->
         /ns_MyRedis -->
              /...
         /ns_MyRabbitMQ -->
             /...
```
   >### Sample Structure 2
  ``` 
/microstack -->
         /myCompanyNanos -->
             /ns_MyRedis -->
                 /...
             /ns_MyRabbitMQ -->
                 /...
```
   >### Sample Structure 3 (requires entry for local dependency into package.json)
  ``` 
/microstack -->
         /...
/ns_MyRedis -->
         /...
```

>## Setup
Installing the microstack base framework

1. Clone **microstack** repo
2. `cd microstack`
3. `npm install` _This will install all external dependencies and other local or peer dependependences explicitly added to the package.json_


>## Run Tests 
Tests depend on files in the **_/microstack/samples/_** directory
1. Cd into `microstack` directory
2. `npm test`
>### Test Logging
To enable logging output for tests use the following from the commandline
```
DEBUG_LEVEL=debug npm test
```

>## Integration
 Weaving your nanostacks into your microservices microcosm

 + Import into your microservice as necessary _e.g. `var stack = require ('./topology').stack;`_
 + Reference nanostack topology properties as necessary _e.g. `var rabbitHost = stack['ss_RabbitMQ'].mqHost;`_
 
  >### Sample Structure 1
  ``` 
/microstack-->
    /ns_MyRedis -->
        /...
    /ns_MyRabbitMQ -->
        /...
```

   >### Sample Structure 2
  ``` 
/microstack-->
    /myCompanyNanos -->
        /ns_MyRedis -->
            /...
        /ns_MyRabbitMQ -->
            /...
```
  >## Add new nanostack
1. Determine a unique identifier(uid) for the nanostack _e.g. **ns_RabbitMQs** ("ns_" prefix represents nanostack)
2. Make a new directory for the uid inside the _**microstack**_ directory and corollary directory for the uid inside the _**test**_ directory 
3. Add schmea, base configuration, overrides and tests TBD
  
  ```
  Investigating using Slush to template/scaffold adding a new nanostack.
  ```