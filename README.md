MicroChasm Ecosystem
=============================================================================
An ecosystem of separated, independent services(micro variety) that share a common collaborative purpose. The pseudo-autonomous nature of each service is complimented by collaboration across the chasm of services. 

>## microchasm
 The microchasm library provides a conduit for rapidly composing microservice ecosystems through scaffolding mechanisms for the microchasm, microservices, microapis and other components as well as tooling for build, deployment, and other full stack services.

 >### Components:
 + **slush-mchasm**- Scaffolding tooling to generate a new microchasm ecosystem
  + Sub-generators:
  1. `microservice`
 + **[microstack](./microstack/README.md)** - Centralized information stores for microservice collaboration topology
 + **[twiglet](./twiglet/README.md)** - Logging tooling for collaboratively felling microservices 
 + **[hapijs](http://hapijs.com/)** used to create microservices, microapi plugins, mircolib plugins.
 + **[lab](https://github.com/hapijs/lab)** and **[code](https://github.com/hapijs/code)** used to create tests  

>## Prereqs
 The following external and peer dependencies currently exist.

 + Depends on the local **twiglet** module as a peer project for logging. _This dependency may move to an external repo at some point_
 +  Depends on the local **microstack** module as a peer project for logging. _This dependency may move to an external repo at some point_
 + **[rekuire](https://github.com/nadav-dav/rekuire)** used to load some modules. 


>## Getting Started
 >### `microchasm` Setup
 + Clone `microchasm` repo
 + Change directory to the cloned repo
 ```
cd microchasm
 ```
 + Install `slush` and `slush-mchasm` globally
```bash
$ npm install -g slush slush-mchasm
```

 >## Usage _(after initial setup)_
  >#### Creating a new micro _Chasm_
_Somewhere outside of your local `microchasm` repository folder_
 + Create a new folder for your project:
```bash
$ mkdir orgChasm
```
 + Change directory to the cloned repo
```
cd orgChasm
```
 + Run the generator from within the new folder:
```bash
$ slush mchasm
```
 + Answer scaffolding questions:
```bash
? What's do you want to call your microChasm? orgChasm
? What should the be the initial version of your microChasm of services? 0.1.0
? Do you want to include tests? (Y/n) 
? Continue with microChasm scaffolding generation? (Y/n) Y
```
#### New _Chasm_ initial folder structure
  ``` 
.../orgChasm -->
         /microstack
         /twiglet
         /samples (optional depending on scaffolding answers)
```

>###  Adding a microservice to your chasm
From inside your chasm base directory, i.e. `/orgChasm`
 + Run the generator from within the new folder:
```bash
$ slush mchasm:microservice
```
 + Answer scaffolding questions:
```bash
? What do you want to call the new microservice? clippy
? Describe what this microservice does. Clipps data from microservices
? What should the be the initial version of this service? 1.0.0
? What should the be the default port for this service?(Can be configured in config/overrides per environment, i.e. NODE_ENV: (9080) 8090
? Do you want to include basic Redis integration into your microservice? (Recommended to add Redis configuration via a nanostack) No
? Continue? (Y/n) Y
```
>### Test microservice
+ Change directory to the microservice directory
 ```
cd clippy
 ```
+ Run tests:
```bash
$ npm test
```
+ Run server:
```bash
$ npm start
```
+ Hit server: [http://localhost:8090/](http://localhost:8090/)

>## Logging Configuration 
Using **[twiglet](./twiglet/README.md)** you can collate logging configurations (_and customize if desired_)

>#### DEBUG_LEVEL
> Use specific logging mechanism for and message and configure the logging level for a logger  

+ Valid methods and debug levels:

 ` ['log', 'trace', 'debug', 'test', 'info', 'data', 'warn', 'error']; `
 + `data` is a special case for transmitting json objects between systems
 
 > ##### Commandline Usage
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
