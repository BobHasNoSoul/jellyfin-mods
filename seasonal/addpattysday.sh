#!/bin/bash
echo "removing old seasonal animations"
/usr/bin/sed -i '/seasonal/d' /usr/share/jellyfin/web/index.html
/usr/bin/sed -i '/snowflake/d' /usr/share/jellyfin/web/index.html
echo "adding pattysday"
/usr/bin/sed -i -e '$a<link rel="stylesheet" href="seasonal/hearts.css">' /usr/share/jellyfin/web/index.html
/usr/bin/sed -i -e '$a<snowflake><div class="snowflakes" aria-hidden="true">  <div class="snowflake">  <img src="seasonal/lep_30x30.png">  </div>  <div class="snowflake">  <img src="seasonal/clover_20x20.png">  </div>  <div class="snowflake">  <img src="seasonal/lep_30x30.png">  </div>  <div class="snowflake">  <img src="seasonal/clover_20x20.png">  </div>  <div class="snowflake">  <img src="seasonal/lep_30x30.png">  </div>  <div class="snowflake">  <img src="seasonal/clover_20x20.png">  </div>  <div class="snowflake">    <img src="seasonal/lep_30x30.png">  </div>  <div class="snowflake">    <img src="seasonal/clover_20x20.png">  </div>  <div class="snowflake">    <img src="seasonal/lep_30x30.png">  </div>  <div class="snowflake">    <img src="seasonal/clover_20x20.png">  </div>  <div class="snowflake">   <img src="seasonal/lep_30x30.png">  </div>  <div class="snowflake">    <img src="seasonal/clover_20x20.png">  </div></div></snowflake>' /usr/share/jellyfin/web/index.html
