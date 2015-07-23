MicroSetup
=============================================================================
Adding a new microapi to your microservice through scaffolding with `slush mchasm:microapi`

## Adding a microapi to your microservice 


### Run the microapi scaffolding generator:

1. From inside your microservice directory, _e.g. `/orgChasm/serviceMe`_
```$ slush mchasm:microapi```
1. Answer scaffolding questions:
```
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
1. **(THIS IS NOW AUTOMATICALLY PERFORMED BY SCAFFOLDING GENERATOR)** 
Update the microservice manifest.js to associate new microapi
```            
 './apis/collector': [{
                routes: {
                    prefix: '/collector'
                }
            }],
 ``` 
 
### Testing a microapi 
>As part of the scaffolding process a basic set of tests under the `<microservice>/test/microapis/<microapi>` directory. 
These tests use the hapijs/lab and hapijs/code libraries to construct tests. The included tests serve as a good starting
 point with good examples of how to add tests as you evolve your microapi. Testing the microapis is accomplished by 
 executing the microservice `npm test`

>1. Change directory to the microservice directory
``` $ cd serviceMe ```
1. Run tests:
``` $ npm test ```

