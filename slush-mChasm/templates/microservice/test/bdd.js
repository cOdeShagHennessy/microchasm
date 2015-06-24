/**
 *
 * Export defintions to match BDD style
 */
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

module.exports.describe = lab.describe;
module.exports.it = lab.it;
module.exports.expect = Code.expect;
module.exports.before = lab.before;
module.exports.after = lab.after;

