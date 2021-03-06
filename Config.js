/*
 * Das ist der erste Schritt: Konfiguration.
 *
 * Beschreibung: In dieser datei stehen die Befehle um die verfügbare Datei in die erwünschte Struktur umzuwandeln.
 * 
 *
 */
var basex = require("./index");
var log = require("./debug");
//var xquery1 = "declare namespace dens=\"urn:isbn:1-931666-22-9\";\n<Model>\n {  for $patent in dens:ead/dens:archdesc/dens:dsc/dens:c/dens:c/dens:c/dens:c\n  where matches($patent/parent::dens:c/parent::dens:c/dens:did/dens:unittitle,'3') and count($patent/dens:index/dens:indexentry/dens:geogname) > 1 \n  let $id := $patent/data(@id)\n  let $beschreibung := $patent/dens:did/dens:unittitle\n  let $jahr := $patent/dens:did/dens:unitdate/data(@normal)\n  let $ortsname := $patent/dens:index/dens:indexentry/dens:geogname/parent::dens:indexentry\n  let $ortsstring := replace( replace($ortsname[1]/dens:geogname , '\n                                        ', ' ') , '\\s([A-Z]+)$' , '' )\n  let $ersteller := $patent/dens:index/dens:indexentry/dens:persname/text()\n  let $type := $patent/dens:index/dens:indexentry/dens:subject/text()\n  let $evalstr := \"let $base := http:send-request(<http:request method='get' href='https://maps.googleapis.com/maps/api/geocode/xml?address=\" || replace($ortsstring, ' ', '+') || \"' />)\n  return $base\"\n  let $ggar := xquery:eval($evalstr)\n  let $lat := $ggar/GeocodeResponse/result[1]/geometry/location/lat/text()\n  let $lng := $ggar/GeocodeResponse/result[1]/geometry/location/lng/text()\nreturn <Patent id=\"{$id}\">\n <Beschreibung>{replace($beschreibung , '\n                                    ', ' ')}</Beschreibung>\n<Ersteller>{$ersteller}</Ersteller>\n<Type>\n{for $t in $type\nreturn <typ>{$t}</typ>}\n</Type>\n <Jahr>{$jahr}</Jahr>\n {\n   if ($ortsname[1]/dens:geogname/text())\n   then <Lokalisierung>\n         <Ort> { $ortsstring }\n  </Ort>\n  <lat> {$lat} </lat>\n <lng> {$evalstr} </lng>\n </Lokalisierung>\n   else ()\n}\n</Patent>\n}\n</Model>";
var struktur = "";
// create session
var client = new basex.Session("localhost", 1984, "admin", "admin");
basex.debug_mode = true;
// create new database
client.execute("drop db patente");

client.execute("create db patente model.xml", function (err, reply){
	client.execute("XQUERY /", function (err, reply){console.log(reply.result)});
	client.close();
	});

//client.execute("create db test_db ./labw-2-6123-aktualisiert.xml");


/*
 client.execute("XQUERY "+xquery1 , function (err, reply)
{
 //struktur = reply.result;

// client.execute("drop db test_db");

 //client.execute("create db patente "+struktur);
 client.execute("create db patente3 assets/model.xml")
 client.execute("XQUERY /", function (err, reply){console.log(reply.result)});

// client.execute("drop db patente");

 client.close();
});
*/
