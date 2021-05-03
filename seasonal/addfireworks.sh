#!/bin/bash
echo "removing old seasonal animations"
/usr/bin/sed -i '/seasonal/d' /usr/share/jellyfin/web/index.html
/usr/bin/sed -i '/snowflake/d' /usr/share/jellyfin/web/index.html
echo "adding fireworks"
/usr/bin/sed -i -e '$a<link rel="stylesheet" href="seasonal/fireworks.css">' /usr/share/jellyfin/web/index.html
/usr/bin/sed -i -e '$a<snowflake><div class="pyro">  <div class="before"></div>  <div class="after"></div></div></snowflake>' /usr/share/jellyfin/web/index.html
