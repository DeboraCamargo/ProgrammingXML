<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
  <xsl:output method="html" indent="yes"/>

  <xsl:param name="region"/>


    <!--<xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>-->
  
  <xsl:template match="/">
  <xsl:value-of select="//region[@name=$region]"/>
  </xsl:template>

  <xsl:template match="/">
        <table border="2" class="table">
          <tr bgcolor="#9acd32">
            <th scope="col">Crimes in <xsl:value-of select="$region"/></th>
            <th scope="col">Incidents</th>
            <th scope="col">Rate</th>
          </tr>
          <xsl:for-each select="//region[@name=$region]/crime">
                <xsl:sort select="self::crime/@incidents" data-type="number" order="descending"/>
            <tr>
              <td scope="row">   
                <xsl:value-of select="self::crime/@type"/>
              </td>
              <td scope="row">
                <xsl:value-of select="self::crime/@incidents"/>
              </td>
              <td scope="row">
                <xsl:value-of select="(self::crime/@incidents div //region[@name=$region]/population-millions) div 10"/>
              </td>

            </tr>
          </xsl:for-each>
        </table>
  </xsl:template>
  
</xsl:stylesheet>