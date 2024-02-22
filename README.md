# jellyfin-mods

If you are having issues with finding the web root you may need to see the [help.md](https://github.com/BobHasNoSoul/jellyfin-mods/blob/main/help.md) to find help with your particular deployment (yes this includes docker)

This is just a guide for various modifications and dumping ground for jellyfin mods i have been kicking around so i dont have to make a new jftool for every platform and revision when they change one single thing that can break it for those that cant or dont want to recompile (yes recompiling would be the way forward but it is not for everyone)

#### Please note this is if you do not want or are unable to compile the web client yourself.. there are better ways of doing these mods but if you insist here is the way to run at it. (not preaching its your server after all :D )

## Table of Contents

- [jellyfin-mods](#jellyfin-mods)
  * [Avatars for users](https://github.com/BobHasNoSoul/jellyfin-avatars)
  * [Change title of the page](https://github.com/BobHasNoSoul/jellyfin-mods/blob/main/README.md#change-the-title)
  * [Featured Content Bar](https://github.com/BobHasNoSoul/jellyfin-featured/)
  * [Auto-hide the music player bar at the bottom when mouse is idle](#auto-hide-the-music-player-bar-at-the-bottom-when-mouse-is-idle)
  * [Add links to other shows inside of the metadata](#add-links-to-other-shows-inside-of-the-metadata)
  * [Add picture links to metadata of a show / movie](#add-picture-links-to-metadata-of-a-show--movie)
  * [Force Theme Music for all users (10.8.x)](#force-theme-music-for-all-users-108x)
  * [Force backdrops for all users (10.8.x)](#force-backdrops-for-all-users-108x)
  * [Change splash logo](#change-splash-logo)
  * [Change font to whatever you want](#change-font-to-whatever-you-want)
  * [Login Background that changes every 10 seconds and reload](#login-background-that-changes-every-10-seconds-and-reload)
  * [Adding logo to sidebar](#adding-logo-to-sidebar)
  * [Adding your logo at the top of the login page](#adding-your-logo-at-the-top-of-the-login-page)
  * [add a link to get more avatars on the profile page](#add-a-link-to-get-more-avatars-on-the-profile-page)
  * [Trailers tab to Requests tab](#trailers-tab-to-requests-tab)
  * [Add custom link to side bar](#add-custom-link-to-side-bar)
  * [Seasonal Animations](#seasonal-animations)
  * [Hide Scrollbar in older microsoft edge (xbox clients)](#hide-scrollbar-in-older-microsoft-edge-xbox-clients)
  * [Pan and tilt the backdrops with fades in and out](#pan-and-tilt-the-backdrops-with-fades-in-and-out)
  * [Default every users page size](#default-every-users-page-size)
  * [Change the Title of Jellyfin in the browser tab](#change-the-title-of-jellyfin-in-the-browser-tab)
- [Adding a footer to jellyfin](#adding-a-footer-to-jellyfin)
- [changing live tv movies from portrait cards to landscape](#changing-live-tv-movies-from-portrait-cards-to-landscape)
  * [NGINX Serviceworker.js fix](#fix-the-serviceworkerjs-so-it-does-not-throw-errors-and-plays-nice-in-nginx)
    + [CSS Modifications](#css-modifications)
  * [my custom css](#my-custom-css-jellyflix-with-a-set-of-my-own-modifications-tweaks-added)
- [Some Extra tools to be used with Jellyfin](#some-extra-tools-to-be-used-with-jellyfin)

---
## Avatars library for your users ##

Updated for 10.8.x

![306088109-e641792f-f408-4834-a5b1-c77d5e9a17d4](https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/e6d54434-6262-4aaa-83d9-80af6b3b415f)

![306088112-339d0f5b-ca10-4a47-9fce-baf6345cf465](https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/fa81553a-9bd5-4655-aaaf-81bbcb25b302)


For full instructions please visit the repo for it https://github.com/BobHasNoSoul/jellyfin-avatars but effectivly this adds a button next to the user profile image that links straight to a avatars library that works with a simple click to download them so your user can upload them and use them on the server

## Change the title ##
to be clear this is the title that appears in browser tabs from jellyfin to your own unique name like "myawesome server"

go to your webroot for jellyfin `/usr/share/jellyfin/web/` and then run `sudo nano main.jellyfin.bundle.js` press ctrl+w and paste the following and hit enter `document.title="Jellyfin"` now edit the part that says Jellyfin to something else so for example `document.title="myawesome server"` then save it by using ctrl+x and y when it asks you to overwrite the original file.

## Featured Content Bar 10.8.XX

![Screenshot 2023-11-08 171638](https://github.com/BobHasNoSoul/jellyfin-featured/assets/23018412/c0765ae0-1eaa-4126-8963-792697d13a68)
![Screenshot 2023-11-08 171524](https://github.com/BobHasNoSoul/jellyfin-featured/assets/23018412/c8865f2b-1a91-4c38-ad49-ce3e768395bb)
![Screenshot 2023-11-08 171453](https://github.com/BobHasNoSoul/jellyfin-featured/assets/23018412/d44b5c3c-7c2f-469f-a1ba-bc433f27633d)



This allows the user to add custom featured content to be pinned to the homepage please see [the seperate repo for this for more details](https://github.com/BobHasNoSoul/jellyfin-featured/) 

it allows users to use a specific accounts favorites to gain content up there or custom lists that are user defined to throw them up via crontab 

---

## Auto-hide the music player bar at the bottom when mouse is idle

![ezgif-1-8eb65ab839](https://user-images.githubusercontent.com/23018412/153445894-56040fe0-3561-40fb-8b0e-e2c7951cc22a.gif)

this one is very hard to screenshot properly but basically it hides that music bar on the bottom of the screen when the mouse is idle as a bonus it also hides the overlay bug (the following is a picture of the overlay bug)

![overlay](https://user-images.githubusercontent.com/23018412/153467810-38a146a3-f03a-499b-80e3-446ef9bad94e.png)

to do this simply run the following in your webroot directory

`sudo nano index.html`

add the following just before the final `</body>` tag

```
<script>
let idleTimer = null;
let idleState = false;

function showFoo(time) {
  clearTimeout(idleTimer);
  if (idleState == true) {
    document.getElementsByClassName("appfooter")[0].style.visibility = "visible";
  }
  idleState = false;
  idleTimer = setTimeout(function() {
    document.getElementsByClassName("appfooter")[0].style.visibility = "hidden";
    idleState = true;
  }, time);
}

showFoo(2000);

$(window).mousemove(function(){
    showFoo(2000);
});
</script>

```

save it with `ctrl+x` and confirm with y and enter then you can clear the cache on your client device and boom auto hide on mouse idle for the appfooter (music player bar) and it auto comes back when you move the mouse when you need it.

---

## Add links to other shows inside of the metadata

![Screenshot 2021-12-13 123925](https://user-images.githubusercontent.com/23018412/145814230-f9571084-daa0-4567-bed2-a8e315b28b2e.png)


note this requires you to go into season 1 for a link to a single season tv series or it will infitite load or the root of the series (the page listing all seasons) for a series with multiple seasons.

in the metadata just add the following but adjust the link near the bottom

    <style>
    redbutton {
        border: 0;
        line-height: 2.5;
        padding: 0 20px;
        font-size: 1rem;
        text-align: center;
        color: #fff;
        text-shadow: 1px 1px 1px #000;
        border-radius: 10px;
        background-color: rgba(220, 0, 0, 1);
        background-image: linear-gradient(to top left,
                                          rgba(0, 0, 0, .2),
                                          rgba(0, 0, 0, .2) 30%,
                                          rgba(0, 0, 0, 0));
        box-shadow: inset 2px 2px 3px rgba(255, 255, 255, .6),
                    inset -2px -2px 3px rgba(0, 0, 0, .6);
    }
    
    redbutton:hover {
        background-color: rgba(255, 0, 0, 1);
    }
    redbutton:active {
        box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                    inset 2px 2px 3px rgba(0, 0, 0, .6);
    }
    </style>
    <redbutton>
    <a href="https://YOUR.LINK.HERE.COM/INDEX.PHP" target="_blank" rel="noreferrer">LINK NAME HERE</a>
    </redbutton>

and click save, all should work if not please check the note above this code segment because that is a known bug.

---

## Add picture links to metadata of a show / movie

![screen](https://user-images.githubusercontent.com/23018412/153666157-07623158-9c3d-4bdf-a446-0cbf07860c48.png)

to do this simply click edit meta data and add the following *change the url to your own as needed* you can also modify the first image url to a static page link for a series or tv show if you want also.

    <style>
    metimage {
    height: 300px;
    padding-bottom: 500px;
    padding-left: 16vw; /*adjust as needed to center or off center what ever you like*/
    padding-top: 50vh;
    overflow: hidden;
    }
    metimage img {
    transition: transform .5s ease;
    }
    metimage:hover img {
    transform: scale(1.3);
    }</style>
    <br><br>
    <metimage><a href="https://URL.COM/IMAGE.jpg" target="_blank"><img src="https://URL.COM/IMAGE.jpg" width=200vw"></a></metimage>
    <br><br><br>

the br tags just add a slight spacer to expand the metadata box jellyfin creates

on a side note this is very very similar to what i attempted to do with extrafanart mod back in the day.. funny how times fly.

---

## Force Theme Music for all users (10.8.x)

Modify this string in your main.jellyfin.bundle.js to default it to tick (forcing most users default.. unless disabled by them)

    enableThemeSongs:function(){return w}

Change it to

    enableThemeSongs:function(){return _}

Save and clear cache reload on clients

*** If you cannot find it (because of regex in search like in nano) try searching for `enableThemeSongs:function` this should give you the ability to find the string above ***

Pro tip: use the theme songs plugin to grab many theme songs for tv shows in one go ( https://github.com/danieladov/jellyfin-plugin-themesongs ) or manually add a theme.mp3 at in the root of each tv show folder i.e. `/tv/breaking bad/theme.mp3` also works for movies but you will have to manuall grab them.

---

## Force backdrops for all users (10.8.x)

Modify this string in your main.jellyfin.bundle.js to default it to tick (forcing most users default.. unless disabled by them)

    enableBackdrops:function(){return P}

Change it to

    enableBackdrops:function(){return _}

Save and clear cache reload on clients

*** If you cannot find it (because of regex in search like in nano) try searching for `enableBackdrops:function` this should give you the ability to find the string above ***

---

## Change splash logo 
besides changing the logo image in the web root files location (/usr/share/jellyfin/web/assets/img/ banner-light.png and icon-transparent.png) which is easy but stops them being animated you can modify index.html to add in your own image or custom gif personally i use a gif that is animated to pulse with my server "BlueBoxOfDOOM" logo

to do this find this string but add what ever you like in where the icon-transparent.png is i.e. if you have a gif in your web root just replace "assets/img/icon-transparent.png" with mygif.gif (this assumes that your gif is named mygif.gif) 

    background-image: url(assets/img/icon-transparent.png);

and then replace the other instance in the splashlogo that is originally this string:

    background-image: url(assets/img/banner-light.png)
    
you can even direct it outside of your host to any other host by changing the part inside the brackets to a full form url e.g. https://media.tenor.com/images/f0e22aca6a9498ce63497ca56fb49602/tenor.gif for that cool 80s rick roll feeling or you can go more proffesional looking... i dont care, its not my server.. your the one modding and using it.



---

## Change font to whatever you want
firstly get a font pack.. there are many out there.. seriously many so take the next few mins to look for the one you like the look of and download the font pack (you can get some from https://google-webfonts-helper.herokuapp.com/fonts/ or from other sources) and unzip it into a new folder you will be making in the web root called "fonts" (your font pack should contain woff woff2 tff eot and svg files). for this example i used the ubuntu font (dont judge me). You can get the same font from here https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular this will work out the box with the following example extract the woff etc into the following directory:

    /usr/share/jellyfin/web/fonts/

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

Easy mode copy paste commands for ubuntu font.. you can use this as a guide to do this for other fonts too if you like

    cd /usr/share/jellyfin/web/
    sudo mkdir fonts
    sudo wget https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular

that wget might do what looks like an error [1] [2] but just ignore that and press ctrl+c and go to the next command

    sudo mv ubuntu-mono* fonts/ubuntu.zip
    sudo unzip fonts/ubuntu.zip
    
and your font is now where it should be, just modify the css to suit different names of fonts




---

## Login Background that changes every 10 seconds and reload

(yes all images can also be changed for whatever you like or even add more or less depending on use case) here are some examples.

![1](https://user-images.githubusercontent.com/23018412/114848291-75cf1580-9dd6-11eb-982c-02c1829785aa.PNG)
![2](https://user-images.githubusercontent.com/23018412/114848300-78ca0600-9dd6-11eb-8120-174a7d22f3ab.PNG)
![3](https://user-images.githubusercontent.com/23018412/114848306-79fb3300-9dd6-11eb-8880-ecdba1b47650.PNG)

this one was just a quick javascript and some files for backgrounds that will let a user be more impressed by certain content you can decide to showcase for that please visit the repo i made http://git.bbod.tk/BobHasNoSoul/jellyfin-fanartbackground it explains it in full and has some screen shots and all required files to download. (including some simple copy paste commands to install it)

---

## Adding logo to sidebar

![logosidebar](https://camo.githubusercontent.com/ffd52556715cd72021af339118fe1bb3466b7686c3d75bd473c694d0ff1228a3/68747470733a2f2f692e696d6775722e636f6d2f74386d316f79362e706e67)

This one is failry simmilar to adding a custom side bar link so edit main.jellyfin.bundle.js

find this string:

    <div style="height:.5em;"></div>',

replace it with the following (replace the img src for a different url or image if you wish by default it will grab the logowhite.png from the web root which will need to be added by the user, any full form url will also work instead of "/web/logowhite.png"):

    <div style="height:.5em;"></div>',t+='<img src="/web/logowhite.png" width=250px style="padding: 5px;display:block; margin-left: auto; margin-right: auto;">',



---

## Adding your logo at the top of the login page

![Capture](https://user-images.githubusercontent.com/23018412/115956212-6b59fd80-a4f3-11eb-915c-324688cf10cb.PNG)
![Capture2](https://user-images.githubusercontent.com/23018412/115956214-6dbc5780-a4f3-11eb-902c-c1068de13163.PNG)

simply go to your web root for jellyfin /usr/share/jellyfin/web/ and use nano (or your own text editor) to edit the session-login-index-html.xxxxxxxxxxxxxxxxxxxxx.bundle.js file
for nano just use 

    sudo nano session-login-index-html.*.bundle.js

press ctrl+w and find the string

     <div class="padded-left padded-right padded-bottom-page margin-auto-y">

now directly after this string paste the following (but ammend for your own logo it can even be a gif if you want animated etc)

    <img src="/web/logo.png" width=350px style="padding: 0px;display:block; margin-left: auto; margin-right: auto;">



---

## Trailers tab to Requests tab

![Capture](https://user-images.githubusercontent.com/23018412/115976129-c5de7280-a562-11eb-9a07-62338388aa9c.PNG)

this replaces the broken trailers tab with a working requests tab, giving clients the ability to login to your ombi from the movie requests tab :D

okay so first you need to modify two files located inside your jellyfin webroot (/usr/share/jellyfin/web/) obviously change the xs to your unique identication

the first file

    sudo nano movies-moviesrecommended.xxxxxxxxxxx.bundle.js

find the string

    {name:h.ZP.translate("Trailers")}

replace it with

    {name:h.ZP.translate("Requests")}
	
the second file (a little bit more complex)

    sudo nano movies-movies-html.xxxxxxxxxxxx.bundle.js

find the string

    <div class="pageTabContent" id="trailersTab" data-index="2"> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> <button is="paper-icon-button-light" class="btnSort autoSize" title="${Sort}"><span class="material-icons sort_by_alpha"></span></button> <button is="paper-icon-button-light" class="btnFilter autoSize" title="${Filter}"><span class="material-icons filter_list"></span></button> </div> <div class="alphaPicker alphaPicker-fixed alphaPicker-fixed-right alphaPicker-vertical"> </div> <div is="emby-itemscontainer" class="itemsContainer vertical-wrap padded-left padded-right"> </div> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> </div> </div> <div class="pageTabContent" id="favoritesTab" data-index="3"> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> <button is="paper-icon-button-light" class="btnSelectView autoSize" title="${ButtonSelectView}"><span class="material-icons view_comfy"></span></button> </div> <div is="emby-itemscontainer" class="itemsContainer padded-left padded-right"> </div> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> </div> </div> <div class="pageTabContent" id="collectionsTab" data-index="4"> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> <button is="paper-icon-button-light" class="btnSelectView autoSize" title="${ButtonSelectView}"><span class="material-icons view_comfy"></span></button> <button is="paper-icon-button-light" class="btnSort autoSize" title="${Sort}"><span class="material-icons sort_by_alpha"></span></button> <button type="button" is="paper-icon-button-light" class="btnNewCollection autoSize"><span class="material-icons add"></span></button> </div> <div is="emby-itemscontainer" class="itemsContainer vertical-wrap centered padded-left padded-right" style="text-align:center"> </div> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> </div> </div> 
	
replace it with this (replace the obvious part inside the string too)	

    <div class="pageTabContent" id="trailersTab" data-index="2"> <div> <iframe src="https://REPLACEME.COM" width="100%" height="850px"></iframe> </div> </div> 



---

## Add custom link to side bar

Find the file config.json in your webroot. In the section "menuLinks" change it to the following and change the properties to suit your needs (icons are from [Material Design Icons](https://jossef.github.io/material-design-icons-iconfont/)).

	"menuLinks": [
    {
        "name": "Custom Link",
        "url": "https://jellyfin.org"
    },
    {
        "name": "Custom Link w. Custom Icon",
        "icon": "attach_money",
        "url": "https://demo.jellyfin.org/stable"
    }
	],

If you only want one link, make sure to remove the comma after the closing bracket (}). If you want to add more links, add a comma for every entry except the last one.

---

## Seasonal Animations

*note the snow animation has been upgraded for a more blizzard effect*

![screen](https://i.imgur.com/xDWkJkc.gif)

simply run the following

    cd /usr/share/jellyfin/web
    sudo git clone http://git.bbod.tk/BobHasNoSoul/jellyfin-mods.git
    cd jellyfin-mods
    sudo mv seasonal ../ 
    cd ..
    sudo rm -r jellyfin-mods


to manually change to each animation you can run the scripts located:
    /usr/share/jellyfin/seasonal/add*.sh
and to remove run the remove script


insert these into your crontab for automated changing

    ## adding seasonal themes
    ## add snow (uncomment one of the snow effects bellow and comment the others out, by default the most snow is enabled)
    #0 0 1 12 * /usr/share/jellyfin/web/seasonal/addsnow.sh
    #0 0 1 12 * /usr/share/jellyfin/web/seasonal/addsnowflakes.sh
    0 0 1 12 * /usr/share/jellyfin/web/seasonal/addmoresnow.sh
    ## remove snow
    0 0 26 12 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh
    ## add hearts
    0 0 14 2 * /usr/share/jellyfin/web/seasonal/addhearts.sh
    ## remove hearts
    0 0 15 2 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh
    ## add pattysday
    0 0 17 3 * /usr/share/jellyfin/web/seasonal/addpattysday.sh
    ## remove pattysday
    0 0 18 3 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh
    ## add halloween
    0 0 1 10 * /usr/share/jellyfin/web/seasonal/addshalloween.sh
    ## remove halloween
    0 0 1 11 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh
    ## Adding fireworks (DISABLED BY DEFAULT THIS BREAKS XBOX MICROSOFT EDGE)
    #0 0 31 12 * /usr/share/jellyfin/web/seasonal/addfireworks.sh
    ## Remove fireworks (Disabled by default)
    # 0 0 1 1 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh

---

## Hide Scrollbar in older microsoft edge (xbox clients) 

    sudo sed -i -e '$abody { -ms-overflow-style: none !important; }' /usr/share/jellyfin/web/themes/dark/theme.css

this adds a line to make it hide the scroll bar while retaining function of the scroll.. yay no more invasive scroll bar from the early 00s

--- 

## Pan and tilt the backdrops with fades in and out

video of this in action:
https://gfycat.com/sizzlingcavernousgalapagospenguin

this is custom css and you can use and adjust all or any values you like but personally i like these values

```
/*pan the background for backdrops*/
@keyframes backgroundScroll {
0% { background-position: 99% 1%; opacity:0;}
33% { background-position: 50% 50%;opacity:1;}
40% { background-position: 99% 99%; opacity:0;}
66% { background-position: 50% 50%; }
75% { background-position: 1% 1%; }
100% { background-position: 50% 50%; }}
.backdropImage {background-size: 150% 150%;  opacity:0 ;background-position: 99% 1%; animation: backgroundScroll 60s ease-in-out 1s;}

@keyframes backgroundScrollmob {
0% { background-position: 99% 1%; opacity:0;}
33% { background-position: 50% 50%;opacity:1;}
40% { background-position: 1% 99%; opacity:0}
66% { background-position: 99% 50%; }
75% { background-position: 99%% 99%; }
100% { background-position: 50% 50%; }}
@media (max-width: 600px) {
  .backdropImage {background-size: 150% 150% cover; opacity:0 ; background-position: 99% 1%; animation: backgroundScrollmob 60s ease-in-out 1s;}
}
```
simply paste that into your custom css in general settings and hit save (works really well with forced backdrop mod)

---

## Default every users page size

change this in your main.xxxxxxxxxxxx.bundle.js (so `sudo nano main.*.bundle.js` )

from this
`this.get("libraryPageSize",!1),10);return 0===t?0:t||100}`

to this
`this.get("libraryPageSize",!1),10);return 0===t?0:t||300}`

you can modifiy the number from 100 to any number you want each users default to be.. note requires users to clear cache in their browser to see the new change.

---

## Change the Title of Jellyfin in the browser tab

This is a fairly simple mod, all you have to do is edit the main.xxxxxxxxxx.bundle.js in the Jellyfin install directory. Open it up and in the massive wall of text find

`document.title="Jellyfin"` and `document.title=e||"Jellyfin"}`

Change the text from Jellyfin to whatever you want, Then open up index.html in the same folder and find `<title>Jellyfin</title>` and change that as well.

---

# Adding a footer to jellyfin

![footer](https://user-images.githubusercontent.com/23018412/128029941-9e0074e0-7668-45d3-9f36-936b1271e75f.png)

This will add a footer to your jellyfin server (see red arrow in the picture) that will auto hide on 5 seconds of mouse inactivity and appear when there is mouse activity this would be typically used for down time of a private server to tell clients that are using the server when to expect there to be "down time" or you could change it to say whatever you like really just modify the footer contents in the index.html once done if that is the case. this will also allow you to turn it off and on at will using the custom css in the admin panel without the need to edit the index.html multiple times (unless you want to change the message for whatever reason).

add the following into your index.html just before the last `</body></html>` tags

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script>
    var timedelay = 1;
    function delayCheck()
    {
    if(timedelay == 5)
    {
    $('#footer').fadeOut();
    timedelay = 1;
    }
    timedelay = timedelay+1;
    }
    $(document).mousemove(function() {
    $('#footer').fadeIn();
    timedelay = 1;
    clearInterval(_delay);
    _delay = setInterval(delayCheck, 500);
    });
    // page loads starts delay timer
    _delay = setInterval(delayCheck, 500)
    </script><div id="footer">Scheduled Server Maintenance on Tuesday 3PM - 4PM BST. The Server will be down for this time.</div>

nearly done just add this in your custom css (Admin panel> General> Custom CSS)

    #footer {position: fixed;  bottom: 0; width: 100%; height: 20px; background: #191818; z-index: 0;text-align: center;
    /*comment out below to hide footer*/
    /*display: none !important;*/
    }

obviously when you want to deactivate it just uncomment the display line to hide it

---

## Add a footer that you can edit from admin panel

like the option above you need to add the following to your index.html before the final `</body></html>` tags

    <script>
    var timedelay = 1;
    function delayCheck()
    {
    if(timedelay == 5)
    {
    $('#footer').fadeOut();
    timedelay = 1;
    }
    timedelay = timedelay+1;
    }
    $(document).mousemove(function() {
    $('#footer').fadeIn();
    timedelay = 1;
    clearInterval(_delay);
    _delay = setInterval(delayCheck, 500);
    });
    // page loads starts delay timer
    _delay = setInterval(delayCheck, 500)
    </script><div id="footer"><span></span></div>

note that this version has no content but instead a span tag.. that is because we will be inserting the message via css, this is not how it is meant to be done but can be done to make life a little easier i guess. 

next we add the following to your custom css in the admin panel

    #footer {position: fixed;  bottom: 0; width: 100%; height: 20px; background: #191818; z-index: 0;text-align: center;
    /*comment out below to hide banner*/
    /*display: none !important;*/
    }
    
    #footer span {
      display: none;
    }
    #footer:after {
      content: 'YOUR MESSAGE HERE, SERIOUSLY CHANGE ME';
    }


---

# changing live tv movies from portrait cards to landscape

Some xmltv guides may not contain a portrait image and if that is the case you get something like the following

![livetvbefore](https://user-images.githubusercontent.com/23018412/129268597-70e68e8a-ed35-4044-bf50-1b68064d0d50.PNG)

but this can look a bit messy so here are the steps to fix it and make it look like this

![livetvafter](https://user-images.githubusercontent.com/23018412/129268615-539b4ca8-30ab-4847-be67-c6009ef37927.PNG)

simply modify the following file in your web root (replace the * with your uuid) livetv-livetvsuggested.*.bundle.js

find `"upcomingTvMovieItems",null,{shape:v()?"overflowPortrait":"portrait"`

replace it with `"upcomingTvMovieItems",null,{shape:v()?"overflowBackdrop":"backdrop"`

now save it and close the file

this will effect the live tv page, however you will notice you still have the same issue when you press the movie header inside the live tv section 

![moviesbefore](https://user-images.githubusercontent.com/23018412/129268691-21cc2c2d-96db-4871-adc0-52bf40eaba6e.PNG)

lets fix that so it looks like the following

![moviesafter](https://user-images.githubusercontent.com/23018412/129268768-2c5204ff-7730-49b9-9f52-0b70475c50f5.PNG)

open the file list.*.bundle.js from inside your webroot (replace the * with your uuid)

find `"Recordings"===r.type?(t="true"===r.IsMovie?"portrait":"autoVertical",i="true"!==r.IsMovie&&"auto",o="true"===r.IsMovie?"portrait":"backdrop"`

replace it with `"Recordings"===r.type?(t="true"===r.IsMovie?"backdrop":"autoVertical",i="true"!==r.IsMovie&&"auto",o="true"===r.IsMovie?"backdrop":"backdrop"`

save then close the file

all done, you will need to clear the cache in your client browser to see the change.

---

## Fix the serviceworker.js so it does not throw errors and plays nice in nginx

![error](https://user-images.githubusercontent.com/23018412/119361783-eefa3c00-bca3-11eb-870c-7908e2b01886.PNG)

Tested working on 10.7.5

edit your main.XXXXXXXXXXXXXX.bundle.js and find this string `/serviceworker.js` and replace it with `/web/serviceworker.js` then simply download the serviceworker.js from this repo and upload into your jellyfin-web root `/usr/share/jellyfin/web/` this will give you a working service worker for use with nginx reverse proxy (please see the serviceworker.js.LICENSE file for the license of that file) 

wait, it looks like the same file?
no its simmilar i removed a few errors mainly the woff2 files being reffered to as auto then the original file name which lead to a non existing file that did not exist, then also bug fixed the issues with the /web/ dir locations.. nothing too fancy but this allows it to actually be ran like it should.

if all went well you can see a install button next to the address bar on the right, this also will not throw any errors in developer tools in chrome. (may need a cache clear on the client)

---

### CSS Modifications

---

## my custom css (jellyflix with a set of my own modifications/ tweaks added)

simply copy the contents of customcss.css (in this repo http://git.bbod.tk/BobHasNoSoul/jellyfin-mods/blob/main/customcss.css ) to your general custom css tab and paste.. or host it yourself or link to it the following is an example if you download customcss.css to your web root (/usr/share/jellyfin/web/)

    @import url("customcss.css");  
    /*fix text being half over to the left on details page*/
    .detail-clamp-text {width: 98vw !important; left: 1% !important; right 1% !important;}
    .detailPagePrimaryContent {padding-bottom: 1rem !important;}
    .backgroundContainer { background-color: #181818 !important;}
    /*fix spacing on the my media*/
    .card {    margin-left: auto !important;    margin-right: auto !important; padding-top: 22px !important;}

this theme does use the font pack for ubuntu you can find this here https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular and you can just unzip that font pack into /usr/share/jellyfin/web/fonts so .woff files etc are in that dir (not a nested folder)

the following hides please login dialog and prevents the login going up to the top by adding a margin.

    /*Hide "please login" text, margin is to prevent login form moving too far up*/
    #loginPage h1 {display: none}
    #loginPage .padded-left.padded-right.padded-bottom-page {margin-top: 10px}

lighten the backdrop background using the following

    /*Lighten background*/
    .backgroundContainer.withBackdrop {background-color: rgba(0, 0, 0, 0.34) !important;}

Transparent top bar using the following
    
    /*transparent top bar*/
    .skinHeader-withBackground {background-color: #20202000 !important;}

Partially transparent side menu with the following

    /*Partialy transparent side bar*/
    div.mainDrawer {background-color: rgba(0,0,0,0.6) !important;}

Remove the title "My Media" with the following

    /* remove My Media title */
    .section0 .sectionTitle {display: none;}

---
# Some Extra tools to be used with Jellyfin
these are some extremely helpfull tools that can be used with Jellyfin and increase functionality.
## Jfa-Go
This is a Jellyfin account manager and creator that can be used to make links to invite people to Jellyfin and allow them to create their username and passsword. Its written in go and can be installed on most OS's. You can find it here https://github.com/hrfee/jfa-go
## Ombi
Ombi is a media requesting service that can be used with Jellyfin. After adding a custom link in the sidebar , when your friends on family want to request a media, they can request it on Ombi, which will then using integration with Radarr, Sonarr among ohers download it. You can get it here https://github.com/Ombi-app/Ombi
## ErsatzTV
ErsatzTV is a bit like PseudoTV for Kodi but more like a Live TV media server. its open source and you can get it here https://github.com/jasongdove/ErsatzTV
## Intros Plugin
Intros Plugin allows you to use a video from preroll.video or a custom video to be played before a movie or show. The offical intros repo seems to be down so you can get it from here https://github.com/dab2020/intro-skipper
