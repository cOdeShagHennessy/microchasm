Tooling "sips" for microservice build and deployment gulps
=============================

Centralized build and deployment tooling for microchasm services

## Sips  
Sips are small tooling modules in the form of gulp tasks. 

 + Each sip is inclusive of only the logic to accomplish its narrowly focused objective. 
 + Sips conform to the following functional interface
   ```javascript
   module.exports = function (gulp, plugins, options) {
   }```
  
 + A sip is passed all required modules via **_plugins_** to execute its functionality by the caller (these can be loaded once via `gulp-load-tasks` or similar module). 
 + Additional **_options_** can also be passed by the caller
  
## Currently supported _sips_ include:

1. `roll-version` - Provides the ability to update the version property of the package.json  
2. `stage-release` - Copies sources into the release directory 

>### Microservice templates include scaffolding of gulpfile.js
>Each microservice created via `slush mchasm:microservice` contains a generated **gulpfile.js**. This gulpfile:
> 
* Loads all plugin modules specified in the package.json of the `/sips` folder.
* Defines local tasks for calling _sips_, passing the plugins and options
* Contains gulp tasks combining _sips_ into common usage patterns
* Can be customzied by the _microchasm_ owner to fit their own needs

Examples:

Increment patch version

  ```bash
    gulp roll-ver 
  ```
Increment prerelease version (with initial prerelease prefix)

  ```javascript
    gulp roll-ver --mode prerelease --preid develop
  ```
Increment prerelease version (subsequent increments)

  ```javascript
    gulp roll-ver --mode prerelease
  ```