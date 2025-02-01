<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
        <head>
            <title>Sitemap</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; }
                th { background-color: #f2f2f2; }
                tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
        </head>
        <body>
            <h1>Sitemap</h1>
            <table>
                <tr>
                    <th>URL</th>
                    <th>Change Frequency</th>
                    <th>Priority</th>
                </tr>
                <xsl:for-each select="urlset/url">
                    <tr>
                        <td><xsl:value-of select="loc"/></td>
                        <td><xsl:value-of select="changefreq"/></td>
                        <td><xsl:value-of select="priority"/></td>
                    </tr>
                </xsl:for-each>
            </table>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
