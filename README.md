# jellyfin-mods
This is just a guide for various modifications and dumping ground for jellyfin mods so i dont have to make a new jftool for every platform and revision 

#### Please note this is if you do not want or are unable to compile the web client yourself.. there are better ways of doing these mods but if you insist here is the way to run at it. (not preaching its your server after all :D )

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

## Change font to whatever you want
firstly get a font pack.. there are many out there.. seriously many so take the next few mins to look for the one you like the look of and download the font pack and unzip it into a new folder you will be making in the web root called "fonts" (your font pack should contain woff woff2 tff eot and svg files. for this example i used the ubuntu font (dont ask me why i just like the font and see it most of the day when using my daily driver pc so dont judge me). You can get the same font from here https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular this will work out the box with the following example

once you have the files in there simply add the following to your css (rename them for your files in turn unless using the linked pack)

    /* ubuntu-regular - latin */
    @font-face {
      font-family: 'Ubuntu';
      font-style: normal;
      font-weight: 400;
      src: url('/web/fonts/ubuntu-v15-latin-regular.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('/web/fonts/ubuntu-v15-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('/web/fonts/ubuntu-v15-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
           url('/web/fonts/ubuntu-v15-latin-regular.woff') format('woff'), /* Modern Browsers */
           url('/web/fonts/ubuntu-v15-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
           url('/web/fonts/ubuntu-v15-latin-regular.svg#Ubuntu') format('svg'); /* Legacy iOS */
    }

html { font-family: "Ubuntu" !important;}

body { -ms-overflow-style: none !important; }
#loginPage .cardPadder { background-color: #24242400 !important; }

.visualCardBox .cardContent{background-size: contain !important;}


## more to be added at a later date when i can write up each of them in a simple how and why kind of way
