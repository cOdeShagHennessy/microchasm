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
