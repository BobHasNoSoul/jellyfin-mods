#!/bin/bash
echo "removing old seasonal animations"
/usr/bin/sed -i '/seasonal/d' /usr/share/jellyfin/web/index.html
/usr/bin/sed -i '/snowflake/d' /usr/share/jellyfin/web/index.html
echo "adding snowflakes"
/usr/bin/sed -i -e '$a<link rel="stylesheet" href="seasonal/hearts.css">' /usr/share/jellyfin/web/index.html
/usr/bin/sed -i -e '$a<snowflake><div class="snowflakes" aria-hidden="true">  <div class="snowflake">  ❅  </div>  <div class="snowflake">  ❆  </div>  <div class="snowflake">  ❅  </div>  <div class="snowflake">  ❆  </div>  <div class="snowflake">  ❅  </div>  <div class="snowflake">  ❆  </div>  <div class="snowflake">    ❅  </div>  <div class="snowflake">    ❆  </div>  <div class="snowflake">    ❅  </div>  <div class="snowflake">    ❆  </div>  <div class="snowflake">    ❅  </div>  <div class="snowflake">    ❆  </div></div></snowflake>' /usr/share/jellyfin/web/index.html
