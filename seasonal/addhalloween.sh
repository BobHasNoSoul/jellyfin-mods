#!/bin/bash
echo "removing old seasonal animations"
/usr/bin/sed -i '/seasonal/d' /usr/share/jellyfin/web/index.html
/usr/bin/sed -i '/snowflake/d' /usr/share/jellyfin/web/index.html
echo "adding hearts"
/usr/bin/sed -i -e '$a<link rel="stylesheet" href="seasonal/halloween.css">' /usr/share/jellyfin/web/index.html
/usr/bin/sed -i -e '$a<snowflake><div class="snowflakes" aria-hidden="true">  <div class="snowflake">  <img src=seasonal/ghost_20x20.png">  </div>  <div class="snowflake">  <img src="seasonal/bat_20x20.png"> </div>  <div class="snowflake">  <img src="seasonal/pumpkin_20x20.png">  </div>  <div class="snowflake">  <img src="seasonal/ghost_20x20.png"> </div>  <div class="snowflake">  <img src="seasonal/bat_20x20.png">  </div>  <div class="snowflake">  <img src="seasonal/pumpkin_20x20.png">  </div>  <div class="snowflake">    <img src="seasonal/ghost_20x20.png">  </div>  <div class="snowflake">    <img src="seasonal/bat_20x20.png">  </div>  <div class="snowflake">    <img src="seasonal/pumpkin_20x20.png">  </div>  <div class="snowflake">    <img src="seasonal/ghost_20x20.png"> </div>  <div class="snowflake">    <img src="seasonal/bat_20x20.png">  </div>  <div class="snowflake">    <img src="seasonal/pumpkin_20x20.png">  </div></div></snowflake>' /usr/share/jellyfin/web/index.html
