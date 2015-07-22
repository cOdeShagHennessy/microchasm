MicroChasm Setup
=============================================================================
Setting up your system to use slush-mchasm scaffolding for microchasm services and apis

## Getting Started

>### _microchasm_ Setup
 + Clone `microchasm` repo
 + Change directory to the cloned repo
 ```
$ cd microchasm
 ```
 + Install `slush` and `slush-mchasm` globally
```bash
$ npm install -g slush slush-mchasm
```
 + If you want to edit scaffolding generation or templates then link `slush-mchasm` to npm repo. From inside the cloned repo directory `microchasm`:
```bash
$ cd slush-mChasm
$ npm link
```

## Usage _(after initial setup)_

>### Creating a new _microChasm_
_Somewhere outside of your local `microchasm` repository folder_
+ Create a new folder for your project:
```bash
$ mkdir orgChasm
```
+ Change directory to the new project directory
```
cd orgChasm
```
+ Run the generator from within that new folder:
```bash
$ slush mchasm
```
+ Answer scaffolding questions:
```
? What's do you want to call your microChasm? orgChasm
? What should the be the initial version of your microChasm of services? 0.1.0
? Do you want to include tests? (Y/n) 
? Continue with microChasm scaffolding generation? (Y/n) Y
```

>### New _Chasm_ initial folder structure
``` 
.../orgChasm -->
         /microstack
         /twiglet
         /samples (optional depending on scaffolding answers)
```

## Adding a microservice to your microchasm
From inside your microchasm base directory, i.e. `/orgChasm`

>## Run the generator from within the new folder:
```bash
$ slush mchasm:microservice
```
+ Answer scaffolding questions:
```bash
? What do you want to call the new microservice? serviceMe
? Describe what this microservice does. serves data to other services
? What should the be the initial version of this service? 1.0.0
? What should the be the default port for this service?(Can be configured in config/overrides per environment,
 i.e. NODE_ENV: (9080) 8090
? Do you want to include basic Redis integration into your microservice? (Recommended to add Redis configuration 
via a nanostack)  - If you include Redis but do not have a redis instance up and running the tests will fail. By default it expects a redis instance to be running on 192.168.59.103 prot 6379 (boot2docker ip and port)
? Continue? (Y/n) Y
```

## Testing microservice
If during the scaffolding process you elected to add tests then a tests directory and some testing samples were added 
into your directory structure. These tests use the hapijs/lab and hapijs/code libraries to construct tests. The included
tests serve as good examples of how to add tests as you evolve your microservice and microchasm.
>+ Change directory to the microservice directory
```
   $ cd serviceMe
 ```
+ Run tests:
```bash
   $ npm test
```
+ Run server:
```bash
   $ npm start
```
+ Browse api documentation: [http://localhost:8090/](http://localhost:8090/)

###  Adding a microapi to your microservice
>From inside your microservice base directory, i.e. `/orgChasm/serviceMe`

+ Run the generator from within the new folder: 
 ```$ slush mchasm:microapi ```

+ Answer scaffolding questions:
 ```bash
? What microservice are you adding the microapi to? (serviceMe)
? What do you want to call this microapi? collector
? Describe what this microapi does. Collects data
? What should the be the initial version of this service? 1.0.0
? What REST methods would you like to support? (Press <space> to select)
 > ping
     get
     put
     post
     delete
    The Works:
     all
? Do you want to include basic Redis integration at a data store for this microapi? (Requires previously 
selecting redis integration with the microservice) (Y/n) n 
? Continue? (Y/n) Y
```
+ Update the microservice manifest.js to associate new microapi
```            
 './apis/collector': [{
                routes: {
                    prefix: '/collector'
                }
            }],
 ```       
### Testing microapis
>As part of the scaffolding process a basic set of tests under the `<microservice>/test/microapis/<microapi>` directory. 
These tests use the hapijs/lab and hapijs/code libraries to construct tests. The included tests serve as a good starting
 point with good examples of how to add tests as you evolve your microapi. Testing the microapis is accomplished by executing the microservice `npm test`

## Logging Configuration 
Using **[twiglet](./twiglet/README.md)** you can collate logging configurations (_and customize if desired_)
>#### DEBUG_LEVEL
Use specific logging mechanism for and message and configure the logging level for a logger  
+ Valid methods and debug levels:
 ` ['log', 'trace', 'debug', 'test', 'info', 'data', 'warn', 'error']; `
+ `data` is a special case for transmitting json objects between systems

>##### Commandline Usage
 ```
DEBUG_LEVEL=debug npm test
DEBUG_LEVEL=debug npm start
```
>#### LOG_STYLE 
> Specify a logging style for output and formatting of logging data

+ Valid styles `default, dailyJSON`
+ `default` outputs data to the console, using colors if available
+ `dailyJSON` outputs to separate file for each logging level in a /logs directory. A new file is begun for each day.

 > ##### Commandline Usage
 ```
LOG_STYLE=dailyJSON npm test
LOG_STYLE=dailyJSON npm start 
```