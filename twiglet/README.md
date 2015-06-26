Logging tooling for collaboratively felling microservices
==================================================================================
Ability to configure common logging format and display. Supports color console output for development and testing, as well as full JSON Lines log files for easy parse of production data.

>## Twigs 
 A twig is a small logging setup that can help facilitate information gathering in development, test or production

  
>## Setup 
1. Clone repo
2. `cd twiglet`
3. `npm install`
4. Import into your microservices as necessary _e.g. `var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');`_
5. Utilizing twiglet methods as appropriate_e.g. ` Logger.info('ENV = %s', process.env.NODE_ENV);`_ 
  
>## Configuration 

>#### Methods
> Use specific logging mechanism for a message 

+ Valid methods:

 ` ['log', 'trace', 'debug', 'test', 'info', 'data', 'warn', 'error']; `
 + `data` is a special case for transmitting json objects between systems

>#### Styles
> Specify output style for logged message console, file, etc.

+ Valid styles `default, dailyJSON`

+ `default` outputs data to the console, using colors if available
+ `dailyJSON` outputs to separate file for each logging level in a /logs directory. A new file is begun for each day.

