Microlib Setup
=============================================================================
Adding a new microlib to your microservice through scaffolding with `slush mchasm:microlib`. A microlib is a microservice
component that provides a particular capability but does expose it through an restful api. The exposed functionality 
might be used by a microapi or it could be invoke by an external signal from a message queue, web socket, cron job or 
other external interface.

## Adding a microlib to your microservice 

### Run the microlib scaffolding generator:

1. From inside your microservice directory, _e.g. `/orgChasm/serviceMe`_
```$ slush mchasm:microlib```
1. Answer scaffolding questions:
```
? What microservice are you adding the microlib to? (serviceMe) serviceMe
? What do you want to call this microlib? exposure
? Describe what this microlib does. Exposes a great capability
? What should the be the initial version of this microlib? 0.1.0
? What method do you want to expose from this microlib? expose
? Do you want to add properties to this microlib? Yes
? Continue? Yes
Adding a new property
? What do you want to call this property? createdDate
? What type is this property? date
? Describe this property? when this was exposed
? What is the default value? now
? add another field? No
```
1. **(THIS IS AUTOMATICALLY PERFORMED BY THE MICROLIB SCAFFOLDING GENERATOR)** 
Update the microservice manifest.js to associate new microlib
```            
 './libs/exposure': [{
            }],
 ``` 
 
### Testing a microlib 
>As part of the scaffolding process a basic set of tests under the `<microservice>/test/microlibs/<exposure>` directory. 
These tests use the hapijs/lab and hapijs/code libraries to construct tests. The included tests serve as a good starting
 point with good examples of how to add tests as you evolve your microlib. Testing the microlibs is accomplished by 
 executing the microservice `npm test`

>1. Change directory to the microservice directory
``` $ cd serviceMe ```
1. Run tests:
``` $ npm test ```

