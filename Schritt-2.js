/*
 * Das ist der erste Schritt: Konfiguration.
 *
 * Beschreibung: In dieser datei stehen die Befehle um die verfügbare Datei in die erwünschte Struktur umzuwandeln.
 * 
 *
 */
var basex = require("./index");
var log = require("./debug");
// create session
var client = new basex.Session("localhost", 1984, "admin", "admin");
basex.debug_mode = false;
// create new database
client.execute("drop db patente2");
client.execute("create db patente2 assets/model.xml");


 client.execute("XQUERY /", function (err, reply){console.log(reply.result)});
 client.close();