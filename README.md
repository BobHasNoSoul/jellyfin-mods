# jellyfin-mods
This is just a guide for various modifications and dumping ground for jellyfin mods so i dont have to make a new jftool for every platform and revision

## Force backdrops for all users (10.7.x)

Modify this string in your main.Xxxxxxxxxx.bundle.js to default it to tick (forcing most users default.. unless disabled by them)

    enableBackdrops:function() {return _}

Change it to

    enableBackdrops:function() {return x}

Save and clear cache reload on clients

## Change splash logo 
besides changing the logo image in the web root files location (/usr/share/jellyfin/web/assets/img/ banner-light.png and icon-transparent.png) which is easy but stops them being animated you can modify index.html to add in your own image or custom gif personally i use a gif that is animated to pulse with my server "BlueBoxOfDOOM" logo

to do this find this string but add what ever you like in where the icon-transparent.png is i.e. if you have a gif in your web root just replace "assets/img/icon-transparent.png" with mygif.gif (this assumes that your gif is named mygif.gif) 

    background-image: url(assets/img/icon-transparent.png);

and then replace the other instance in the splashlogo that is originally this string:

    background-image: url(assets/img/banner-light.png)
    
you can even direct it outside of your host to any other host by changing the part inside the brackets to a full form url e.g. https://media.tenor.com/images/f0e22aca6a9498ce63497ca56fb49602/tenor.gif for that cool 80s rick roll feeling or you can go more proffesional looking... i dont care, its not my server.. your the one modding and using it.

