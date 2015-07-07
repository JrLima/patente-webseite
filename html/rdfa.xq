let $p >) //Patente[data(@id)="labw-2-57740"]
return <div>
<table prefix="
  foaf:	http://xmlns.com/foaf/0.1/
  gr: http://purl.org/goodrelations/v1#
  dt:http://purl.org/dc/elements/1.1/
  xsd: http://www.w3.org/2001/XMLSchema#">
<tr typeof="gr:SomeItems" itemid="#product">
  <div rel="foaf:depiction"> 
  <td>
<img src="/img/{$p/data(@id)}.png" alt="product image">
</td>
    </div>
<td class="right">
<h3 class="title" property="gr:description">{$p/Beschreibung}</h3>
  <p><span property="http://purl.org/dc/terms/Location">{$p/../Ort}</span> , <span property="dt:Date">{$p/jahr}</span></p>
  <p>Typen: <span property="gr:isSimilarTo">{for $t in $p/Type/typ/text() return <span>{$t} </span>}</span></p>
</td>
</tr>
</table>
<br /><br />
<table>
<tr typeof="foaf:Person">
<td property="foaf:img">
  <img src="/img/{$p/data(@id)}.png">
</td>
<td class="right">
  <h3 class="title">Mehr &uuml;ber der Ersteller</h3>
  <p><b><span property="foaf:firstName">Karl</span> <span property="foaf:lastName">Katzenschwanz</span></b></p>
  <p>Geburtsort: <span property="https://schema.org/birthPlace"> Stuttgart</span></p>
</td>
</tr>
</table>

</div>