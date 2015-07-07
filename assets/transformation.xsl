<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" />
<xsl:template match="Model">
[
      <xsl:for-each select="Lokalisierung/Patent">
      {
          'patentId' : '<xsl:value-of select="@id"/>',
          'start' : '<xsl:value-of select="Jahr"/>-01-01',
          'end' : '<xsl:value-of select="Jahr"/>-12-31',
          'point' : {
            'lat' : '<xsl:value-of select="../lat"/>',
            'lon' : '<xsl:value-of select="../lng"/>'
         },
         'title' : '<xsl:value-of select="Ersteller"/>',
        'options' : {
              'infoHtml' : 
                 '<h3><b>"<xsl:value-of select="Ersteller"/>"</b></h3><p>Jahr: "<xsl:value-of select="Jahr"/>"</p><p>Ort: "<xsl:value-of select="../Ort"/>"</p><a><xsl:attribute name="onclick">oeffnefenster("http://localhost:8080/img/<xsl:value-of select="@id" />.png")</xsl:attribute><img><xsl:attribute name="src">img/<xsl:value-of select="@id" />.png</xsl:attribute><xsl:attribute name="class">imgpatent</xsl:attribute></img></a><br /><br /><a><xsl:attribute name="href">#<xsl:value-of select="@id" /></xsl:attribute><xsl:attribute name="onclick">patentzeigen("<xsl:value-of select="@id" />")</xsl:attribute>mehr Informationen</a>'


                    }
      } <xsl:if test="position() != last()">
      <xsl:text>, </xsl:text>
   </xsl:if>

      </xsl:for-each>
]
</xsl:template>
</xsl:stylesheet>