# jellyfin-mods
This is just a guide for various modifications and dumping ground for jellyfin mods so i dont have to make a new jftool for every platform and revision

## Force backdrops for all users (10.7.x)

Modify this string in your main.Xxxxxxxxxx.bundle.js to default it to tick (forcing most users default.. unless disabled by them)

    enableBackdrops:function() {return _}

Change it to

    enableBackdrops:function() {return x}

Save and clear cache reload on clients

