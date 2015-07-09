var colors = require('colors/safe');

/**
 * If the message cannot be parse into JSON already, then we need to JSON.stringify() it
 * @param str
 * @returns {*}
 */
function jsonObj(str) {
    try {
        var valid = JSON.parse(str);
        if (valid)
            return str;
        else
            return '{"error":"Message not parseable as JSON"}';
    } catch (err) {
        return JSON.stringify(str);
    }
}

module.exports = function (level, style) {
    var methods = ['log', 'trace', 'debug', 'test', 'info', 'data', 'warn', 'error'];
    var config = {
        default:   {
            strategy: 'colorConsole',
            setting:  {
                level:      level || 'data',
                methods:    methods,
                filters:    [
                    colors.italic, colors.green, //default colors
                    {
                        test:  [colors.bgMagenta, colors.white],
                        info:  colors.blue,
                        warn:  colors.yellow,
                        error: [colors.red, colors.bold]
                    }
                ],
                format:     [
                    "{{timestamp}} <{{title}}> {{message}}(in {{file}}:{{line}})", //default format
                    {
                        data:  "{{timestamp}}:{{message}}",
                        error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
                    }
                ],
                dateformat: "yyyy-mm-dd'T'HH:MM:ss",
                preprocess: function (data) {
                    data.title = colors.bold(data.title.toUpperCase());
                    data.file = colors.inverse(data.file);
                    data.stack = colors.inverse(data.stack);
                }
            }
        },
        dailyJSON: {
            strategy: 'dailyfile',
            setting:  {
                root:          './logs',
                logPathFormat: '{{root}}/{{prefix}}.{{date}}.json',
                methods:       methods,
                level:         level || 'data',
                format:        [
                    '{ "timestamp":"{{timestamp}}","file":"{{file}}", "line":"{{line}}", "message":{{jsonlog}} }',
                    {
                        test:  '{ "timestamp":"{{timestamp}}","path":"{{path}}","file":"{{file}}", "line":"{{line}}", "args":{{jsonlog}} }',
                        data:  '{ "timestamp":"{{timestamp}}","file":"{{file}}", "line":"{{line}}", "tag":{{datatag}},"data":{{jsonlog}} }',
                        error: '{ "timestamp":"{{timestamp}}","file":"{{file}}", "line":"{{line}}", "args":{{jsonlog}}, "stack":{{stack}} }'
                    }
                ],
                dateformat:    "yyyy-mm-dd'T'HH:MM:ss",
                filters:       [jsonObj],
                preprocess:    function (data) {

                    data.datatag = JSON.stringify('untagged');
                    if (data.args.length === 1 && typeof data.args[0] === 'object')
                        data.jsonlog = JSON.stringify(data.args[0]);
                    else if (data.args.length > 1 && typeof data.args[1] === 'object') {
                        data.datatag = JSON.stringify(data.args[0]);
                        data.jsonlog = JSON.stringify(data.args[1]);
                    } else data.jsonlog = JSON.stringify(data.args);

                    if (data.stack)
                        data.stack = JSON.stringify(data.stack);
                }
            }
        }
    };
    //
    // Establish twiglet configuration based on style
    var c = config[style] || config['default'];
    return require('tracer')[c.strategy](c.setting);
};