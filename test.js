var basex = require("./index");
var log = require("./debug");
var client = new basex.Session("localhost", 1984, "admin", "admin");
basex.debug_mode = true;
client.execute("check patente");

client.execute("XQUERY xslt:transform-text('model.xml', /transformation.xsl')", function (err, reply){console.log(reply.result)});
console.log('ma oe!');
