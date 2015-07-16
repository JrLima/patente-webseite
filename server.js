// server.js
var path = require('path');
var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;

var basex = require("./index");
var log = require("./debug");
 //create session
var client = new basex.Session("localhost", 1984, "admin", "admin");
basex.debug_mode = false;
client.execute("check patente");

/*			/REST SERVER			*/
var rest = express.Router();

rest.use(function(req, res, next) {
	//paramsquery = (Object.keys(req.query).length === 0) ? "" : "\n<br />\n"+JSON.stringify(req.query, null, 2);
	
    // log each request to the console
    console.log(req.method, req.url);
	
    // continue doing what we were doing and go to the route
    next(); 
});

rest.get('/', function(req, res) {
	client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; /", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
});

rest.get(['/patente','/patente/:id'], function(req, res) {
	if (req.params.id == "html" || typeof req.params.id === 'undefined')
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> <ul> { for $p in Model/Lokalisierung/Patent return <li><a href=\"/rest/patente/{ $p/data(@id) }\">{ $p/Beschreibung/text() }</a></li> } </ul> </Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
	else if (req.params.id == "xml")
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> { for $p in Model/Lokalisierung/Patent return $p/Beschreibung/text() } </Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
	else
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; for $ort in Model/Lokalisierung/Patent[data(@id='" + req.params.id + "')]/parent::* return <Lokalisierung> { $ort/Ort } { $ort/lat } { $ort/lng } { $ort/Patent[data(@id='" + req.params.id + "')] } </Lokalisierung>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
});

rest.get(['/jahre','/jahre/:jahr'], function(req, res) {
	if (req.params.jahr == "html" || typeof req.params.jahr === 'undefined')
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> <ul>{ for $jahr in distinct-values(Model/Lokalisierung/Patent/Jahr) return <li><a href=\"/rest/jahre/{ $jahr }\">{ $jahr }</a></li> } </ul> </Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
	else if (req.params.jahr == "xml")
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> { for $jahr in distinct-values(Model/Lokalisierung/Patent/Jahr) return  <Jahr>{$jahr}</Jahr>  } </Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
	else
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> { for $ort in Model/Lokalisierung[Patent/Jahr/text()='"+req.params.jahr+"'] return <Lokalisierung> { $ort/Ort } { $ort/lat } { $ort/lng } { for $p in $ort/Patent[Jahr/text()='"+req.params.jahr+"'] return $p } </Lokalisierung> }</Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
});

rest.get(['/orte','/orte/:ort'], function(req, res) {
	if (req.params.ort == "html" || typeof req.params.ort === 'undefined')
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> <ul> { for $ort in Model/Lokalisierung return <li> <a href=\"/rest/orte/{ web:encode-url($ort/Ort) }\">{ $ort/Ort }</a></li>  } </ul>  </Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
	else if (req.params.ort == "xml")
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> { for $ort in Model/Lokalisierung return $ort/Ort  }  </Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
	else
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> { for $ort in Model/Lokalisierung[Ort/text()=web:decode-url('"+req.params.ort+"')] return $ort }</Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
});


rest.get(['/type','/type/:typ'], function(req, res) {
	if (req.params.typ == "html" || typeof req.params.typ === 'undefined')
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> <ul>{ for $typ in distinct-values(Model/Lokalisierung/Patent/Type/typ) return <li><a href=\"/rest/type/{ web:encode-url($typ) }\">{ $typ }</a></li> }</ul></Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
	else if (req.params.typ == "xml")
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> { for $typ in distinct-values(Model/Lokalisierung/Patent/Type/typ) return <typ>{$typ}</typ>  }</Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
	else
	 client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; <Resultaet> { for $ort in Model/Lokalisierung[Patent/Type/typ/text()=web:decode-url('"+req.params.typ+"')] return <Lokalisierung> { $ort/Ort } { $ort/lat } { $ort/lng } { for $p in $ort/Patent[Type/typ/text()=web:decode-url('"+req.params.typ+"')] return $p } </Lokalisierung> }</Resultaet>", function (err, reply){res.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + reply.result)});
});

app.use('/rest', rest);

/*			STATIC SERVER			*/
var staticserver = express.Router();
var staticPath = path.resolve(__dirname, '/html');

staticserver.get('/json', function(req, res) {
	client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; xslt:transform-text('model.xml', 'transformation.xsl')", function (err, reply){res.send(reply.result)});
});

staticserver.get('/rdfa/:id', function(req, res) {
//	client.execute("XQUERY let $p := //Patent[data(@id)=\"" + req.params.id + "\"]return <div><table prefix=\"  foaf:	http://xmlns.com/foaf/0.1/  gr: http://purl.org/goodrelations/v1#  dt:http://purl.org/dc/elements/1.1/  xsd: http://www.w3.org/2001/XMLSchema#\"><tr typeof=\"gr:SomeItems\" itemid=\"#product\">  <div rel=\"foaf:depiction\">   <td><img src=\"/img/{$p/data(@id)}.png\" alt=\"product image\" /></td>    </div><td class=\"right\"><h3 class=\"title\" property=\"gr:description\">{$p/Beschreibung}</h3>  <p><span property=\"http://purl.org/dc/terms/Location\">{$p/../Ort}</span> , <span property=\"dt:Date\">{$p/Jahr}</span></p>  <p>Typen: <span property=\"gr:isSimilarTo\">{for $t in $p/Type/typ/text() return <span>{$t} </span>}</span></p></td></tr></table><br /><br /><table><tr typeof=\"foaf:Person\"><td property=\"foaf:img\">  <img src=\"/img/{$p/data(@id)}.png\" /></td><td class=\"right\">  <h3 class=\"title\">Mehr über der Ersteller</h3>  <p><b><span property=\"foaf:firstName\">Karl</span> <span property=\"foaf:lastName\">Katzenschwanz</span></b></p>  <p>Geburtsort: <span property=\"https://schema.org/birthPlace\"> Stuttgart</span></p></td></tr></table></div>", function (err, reply){res.send(reply.result)});
	client.execute("XQUERY declare default element namespace \"http://localhost:8080/Schema.xml\"; declare namespace functx = \"http://www.functx.com\"; declare function functx:substring-before-if-contains  ( $arg as xs:string? ,    $delim as xs:string )  as xs:string? {   if (contains($arg,$delim))   then substring-before($arg,$delim)   else $arg } ;let $p := //Patent[data(@id)=\"" +req.params.id + "\"] let $i := $p/Ersteller let $name := functx:substring-before-if-contains(substring-before(substring-after($i, '; '), ','), ' ') let $nachname:= functx:substring-before-if-contains(substring-before($i, ';'),',') return <div> <table prefix=\"  foaf:	http://xmlns.com/foaf/0.1/  gr: http://purl.org/goodrelations/v1#  dt:http://purl.org/dc/elements/1.1/  xsd: http://www.w3.org/2001/XMLSchema#\"><tr typeof=\"gr:SomeItems\" itemid=\"#product\">  <div rel=\"foaf:depiction\">   <td><img src=\"/img/{$p/data(@id)}.png\" alt=\"product image\" /></td>    </div><td class=\"right\"><h3 class=\"title\" property=\"gr:description\">{$p/Beschreibung}</h3>  <p><span property=\"http://purl.org/dc/terms/Location\">{$p/../Ort}</span> , <span property=\"dt:Date\">{$p/Jahr}</span></p>  <p>Typen: <span property=\"gr:isSimilarTo\">{for $t in $p/Type/typ/text() return <span>{$t} </span>}</span></p></td></tr></table><br /><br /> <table>  <tr typeof=\"foaf:Person\">  <td property=\"foaf:img\"><img src=\"/images/Kein_bild.jpg\" /></td>  <td class=\"right\">  <h3 class=\"title\">Mehr über der Ersteller</h3>  <p><b><span property=\"foaf:firstName\">{$name}</span> <span property=\"foaf:lastName\">{$nachname}</span></b></p>  <p>Lebenslauf: <span property=\"https://schema.org/birthPlace\">{ if ($p/Lebenslauf) then let $l := $p/Lebenslauf return $l else let $l := \"Nich Verfügbar\" return $l}</span></p></td> </tr></table></div>", function (err, reply){res.send(reply.result)});
	console.log("RDFA: " + req.params.id);
});

staticserver.get('/*', function(req, res){
    var uid = req.params.uid,
        path = req.params[0] ? req.params[0] : 'index.html';
    res.sendFile(path, {root: './html'});
});

app.use('/', staticserver);

app.listen(port);
console.log('Magic happens on port ' + port);

/*
staticserver.get('/:filename', function(req, res) {
	res.sendFile(__dirname + "/html/" + req.params.filename);
});

staticserver.get('/:dir0/:dir1/:dir2/:dir3/:filename', function(req, res) {
	res.sendFile(__dirname + "/html/" + req.params.dir0 + "/" + req.params.dir1 + "/" + req.params.dir2 + "/" + req.params.dir3 + "/" + req.params.filename);
});

staticserver.get('/:dir0/:dir1/:dir2/:filename', function(req, res) {
	res.sendFile(__dirname + "/html/" + req.params.dir0 + "/" + req.params.dir1 + "/" + req.params.dir2 + "/" + req.params.filename);
});

staticserver.get('/:dir0/:dir1/:filename', function(req, res) {
	res.sendFile(__dirname + "/html/" + req.params.dir0 + "/" + req.params.dir1 + "/"  + req.params.filename);
});

staticserver.get('/:dir/:filename', function(req, res) {
	res.sendFile(__dirname + "/html/" + req.params.dir + "/" + req.params.filename);
});



			/RDFa SERVER			
var rfda = express.Router();
rfda.use(function(req, res, next) {
	paramsquery = (Object.keys(req.query).length === 0) ? "" : "\n<br />\n"+JSON.stringify(req.query, null, 2);
	res.send(paramsquery);
	

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

app.use('/rfda', rfda);




var doXquery = function (select, where) {
	var prepareQuery = function (objJson) {
		var queryString = [];
		for (key in objJson) {
			queryString.push(key + " " + objJson[key]);
		}
		return queryString.join(' and ')
	};
	
	var selectquery = (
			function (objJson) {
				var queryString = [];
				for (key in objJson) {
					queryString.push(key + " " + objJson[key]);
					}
				return queryString.join(' and ');
			}
		)(select),
		wherequery = (
			function (objJson) {
				var queryString = [];
				for (key in objJson) {
					queryString.push(key + " " + objJson[key]);
					}
				return queryString.join(' and ');
			}
		)(where);
	
	
	}

	
	
	
	if (Object.keys(req.query).length !== 0)
	{
		paramsquery = "\n<br />\n"+JSON.stringify(req.query, null, 2);
	}

	
	
	
rest.get('/patentes', function(req, res) {
	res.send("here goes the list of patents");
    res.send
(
" <?xml version=\"1.0\"?>\n"+
"\n"+
"<rdf:RDF\n"+
"xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n"+
"xmlns:si=\"http://www.w3schools.com/rdf/\">\n"+
"\n"+
"<rdf:Description rdf:about=\"http://www.w3schools.com\">\n"+
"  <si:title>W3Schools</si:title>\n"+
"  <si:author>Jan Egil Refsnes</si:author>\n"+
"</rdf:Description>\n"+
"\n"+
"</rdf:RDF> \n"
);

});




"<p>Typen: \"<xsl:for-each select="Type/typ">   <xsl:value-of select="."/>   <xsl:if test="position() != last()">      <xsl:text>, </xsl:text>   </xsl:if></xsl:for-each>\"</p>" +
"<p>Beschreibung: \"<xsl:value-of select="Beschreibung"/>\"</p>" + 
*/

