labw-2-58519
XQUERY
declare namespace functx = "http://www.functx.com";
declare function functx:substring-before-if-contains
  ( $arg as xs:string? ,
    $delim as xs:string )  as xs:string? {

   if (contains($arg,$delim))
   then substring-before($arg,$delim)
   else $arg
 } ;
let $p := //Patent[data(@id)=\"" + req.params.id + "\"]
let $i := $p/Ersteller
let $name := substring(functx:substring-before-if-contains(functx:substring-before-if-contains(substring-before(substring-after($i, '; '), ','), '.'), ' '), 1 , 1)
let $nachname:= functx:substring-before-if-contains(substring-before($i, ';'),',')

if ($p/Lebenslauf)
then let $l := $p/Lebenslauf
else let $p := "Nich Verfügbar"

return <div>
<table prefix=\"  foaf:	http://xmlns.com/foaf/0.1/  gr: http://purl.org/goodrelations/v1#  dt:http://purl.org/dc/elements/1.1/  xsd: http://www.w3.org/2001/XMLSchema#\"><tr typeof=\"gr:SomeItems\" itemid=\"#product\">  <div rel=\"foaf:depiction\">   <td><img src=\"/img/{$p/data(@id)}.png\" alt=\"product image\" /></td>    </div><td class=\"right\"><h3 class=\"title\" property=\"gr:description\">{$p/Beschreibung}</h3>  <p><span property=\"http://purl.org/dc/terms/Location\">{$p/../Ort}</span> , <span property=\"dt:Date\">{$p/Jahr}</span></p>  <p>Typen: <span property=\"gr:isSimilarTo\">{for $t in $p/Type/typ/text() return <span>{$t} </span>}</span></p></td></tr></table><br /><br />
<table>
 <tr typeof=\"foaf:Person\">
  <td property=\"foaf:img\"><img src=\"/images/Kein_bild.jpg\" /></td>
  <td class=\"right\">  <h3 class=\"title\">Mehr über der Ersteller</h3>  <p><b><span property=\"foaf:firstName\">{$name}</span> <span property=\"foaf:lastName\">{$nachname}</span></b></p>  <p>Lebenslauf: <span property=\"https://schema.org/birthPlace\">{$l}</span></p></td>
 </tr></table></div>