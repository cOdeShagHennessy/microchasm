Microservice Setup
=============================================================================
Creating a new microservice in your microchasm through scaffolding with `slush mchasm:microservice`

## Adding a microservice to your microchasm


### Run the microservice scaffolding generator:

>1. From inside your microchasm base directory, _e.g. `/orgChasm`_
```$ slush mchasm:microservice```
1. Answer scaffolding questions:
```
? What do you want to call the new microservice? serviceMe
? Describe what this microservice does. serves data to other services
? What should the be the initial version of this service? 1.0.0
? What should the be the default port for this service?(Can be configured in config/overrides per environment,
 i.e. NODE_ENV: (9080) 8090
? Do you want to include basic Redis integration into your microservice? (Recommended to add Redis configuration 
via a nanostack)  - If you include Redis but do not have a redis instance up and running the tests will fail. By default it expects a redis instance to be running on 192.168.59.103 prot 6379 (boot2docker ip and port)
? Continue? (Y/n) Y
```

### Testing microservice
During the scaffolding process some testing samples were added into your directory structure. These tests use the 
hapijs/lab and hapijs/code libraries to construct tests. The included tests serve as good examples of how to add tests 
as you evolve your microservice and microchasm.
>1. Change directory to the microservice directory
``` $ cd serviceMe ```
1. Run tests:
``` $ npm test ```
1. Run server:
``` $ npm start ```
1. Browse api documentation: [http://localhost:9080/](http://localhost:9080/)

# Tips

## Logging Configuration 
Using **[twiglet](./twiglet/README.md)** you can collate logging configurations (_and customize if desired_)
#### DEBUG_LEVEL
Use specific logging mechanism for and message and configure the logging level for a logger  
>+ Valid methods and debug levels:
 ` ['log', 'trace', 'debug', 'test', 'info', 'data', 'warn', 'error']; `
+ `data` is a special case for transmitting json objects between systems

>##### Commandline Usage
``` DEBUG_LEVEL=debug npm test ```
``` DEBUG_LEVEL=debug npm start ```


#### LOG_STYLE 
Specify a logging style for output and formatting of logging data
>+ Valid styles `default, dailyJSON`
+ `default` outputs data to the console, using colors if available
+ `dailyJSON` outputs to separate file for each logging level in a /logs directory. A new file is begun for each day.

> #### Commandline Usage
``` LOG_STYLE=dailyJSON npm test ```
```LOG_STYLE=dailyJSON npm start```
