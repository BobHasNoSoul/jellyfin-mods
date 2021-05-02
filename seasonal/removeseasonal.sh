#!/bin/bash
echo "removing old seasonal animations"
/usr/bin/sed -i '/seasonal/d' /usr/share/jellyfin/web/index.html