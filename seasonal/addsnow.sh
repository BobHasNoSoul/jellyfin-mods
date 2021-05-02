#!/bin/bash
echo "removing old seasonal animations"
/usr/bin/sed -i '/seasonal/d' /usr/share/jellyfin/web/index.html
echo "adding snowstorm"
/usr/bin/sed -i -e '$a<script src="seasonal/snowstorm.js"></script>' /usr/share/jellyfin/web/index.html
